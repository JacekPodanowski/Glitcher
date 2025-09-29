import sys
import os
import time
import requests
import json
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import WebDriverException, TimeoutException

# --- Configuration ---
PAYLOAD_FILE = "glitch_payload.js"

# --- The Script ---

def validate_and_format_url(url_string):
    if not isinstance(url_string, str) or not url_string: 
        return None
    if not url_string.startswith(('http://', 'https://')): 
        url_string = 'https://' + url_string
    parsed = urlparse(url_string)
    if not parsed.scheme or not parsed.netloc: 
        return None
    return url_string

def check_website_status(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.head(url, allow_redirects=True, timeout=10, headers=headers)
        if 200 <= response.status_code < 400:
            print(f"[+] Website {url} is online (Status: {response.status_code}).")
            return True
        else:
            print(f"[-] Website {url} returned status: {response.status_code}.")
            return False
    except requests.RequestException as e:
        print(f"[!] Error connecting to {url}: {e}")
        return False

def print_browser_logs(driver, tab_name="Current Tab"):
    """
    Print browser console logs to help debug issues
    """
    try:
        logs = driver.get_log('browser')
        if logs:
            print(f"\n[CONSOLE LOGS - {tab_name}]")
            for log in logs:
                level = log['level']
                message = log['message']
                
                if level == 'SEVERE':
                    print(f"  ❌ ERROR: {message}")
                elif level == 'WARNING':
                    print(f"  ⚠️  WARN: {message}")
                else:
                    print(f"  ℹ️  INFO: {message}")
            print("[END CONSOLE LOGS]\n")
    except Exception as e:
        print(f"[!] Could not retrieve logs: {e}")

def apply_dark_theme_css(driver):
    """
    Apply custom black-pink gradient CSS theme to the page
    """
    theme_css = """
        (function() {
            if (document.getElementById('glitch-dark-theme')) return;
            
            const style = document.createElement('style');
            style.id = 'glitch-dark-theme';
            style.textContent = `
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #ff00ff #0a0a0a !important;
                }
                
                ::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }
                
                ::-webkit-scrollbar-track {
                    background: linear-gradient(180deg, #000000 0%, #1a001a 50%, #2d002d 100%);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #4b0082 0%, #8b008b 50%, #ff00ff 100%);
                    border-radius: 6px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #6a0dad 0%, #ba55d3 50%, #ff69b4 100%);
                }
                
                html {
                    filter: contrast(1.1) brightness(0.95);
                }
            `;
            document.head.appendChild(style);
            
            console.log('[GlitchArt] Dark theme CSS applied successfully');
        })();
    """
    try:
        driver.execute_script(theme_css)
        print("[+] Dark theme with pink gradient applied")
    except Exception as e:
        print(f"[!] Could not apply theme: {e}")

def wait_for_page_ready(driver, timeout=10):
    """
    Wait for page to be fully loaded and ready for injection
    """
    try:
        start_time = time.time()
        while time.time() - start_time < timeout:
            ready_state = driver.execute_script("return document.readyState")
            if ready_state == "complete":
                return True
            time.sleep(0.2)
        return False
    except:
        return False

def inject_payload_to_current_tab(driver, glitch_script, show_logs=False):
    """
    Inject payload to current tab with proper timing
    """
    try:
        # Wait for page to be ready
        if not wait_for_page_ready(driver):
            print("[!] Page not fully loaded, injecting anyway...")
        
        # Apply dark theme first
        apply_dark_theme_css(driver)
        
        # Inject glitch payload
        driver.execute_script(glitch_script)
        
        # Verify injection was successful
        verification = driver.execute_script("""
            return {
                glitchArtExists: typeof window.GlitchArt !== 'undefined',
                html2canvasLoaded: typeof html2canvas !== 'undefined',
                libraryFunctions: window.GlitchArt ? Object.keys(window.GlitchArt) : []
            };
        """)
        
        if verification['glitchArtExists']:
            print(f"[✓] GlitchArt library loaded: {', '.join(verification['libraryFunctions'])}")
        else:
            print("[!] WARNING: GlitchArt library not found after injection!")
        
        if show_logs:
            time.sleep(0.5)
            print_browser_logs(driver, driver.title[:30])
        
        return True
    except Exception as e:
        print(f"[!] Injection error: {e}")
        return False

def inject_payload_to_all_tabs(driver, glitch_script, show_logs=False):
    """
    Inject payload to all open tabs with proper window handling
    """
    original_window = driver.current_window_handle
    all_windows = driver.window_handles
    
    injected_count = 0
    
    for window in all_windows:
        try:
            driver.switch_to.window(window)
            
            # Wait a bit for new tabs to load
            time.sleep(0.3)
            
            # Check if window is accessible
            try:
                title = driver.title
            except:
                print("[!] Tab not accessible, skipping...")
                continue
            
            if title:
                # Wait for page to be ready
                wait_for_page_ready(driver, timeout=5)
                
                # Inject payload
                if inject_payload_to_current_tab(driver, glitch_script, show_logs):
                    injected_count += 1
                    print(f"[+] Injected into: {title[:50]}")
                else:
                    print(f"[!] Failed to inject into: {title[:50]}")
        except Exception as e:
            print(f"[!] Error switching to tab: {e}")
    
    print(f"[+] Successfully injected into {injected_count}/{len(all_windows)} tabs")
    
    # Switch back to original window
    try:
        driver.switch_to.window(original_window)
    except:
        if all_windows:
            try:
                driver.switch_to.window(all_windows[0])
            except:
                pass

def main():
    if len(sys.argv) != 2:
        print("Usage: python local_injector.py <website_url>")
        sys.exit(1)

    target_url = validate_and_format_url(sys.argv[1])
    if not target_url:
        print(f"[!] Invalid URL format: '{sys.argv[1]}'.")
        sys.exit(1)

    if not os.path.exists(PAYLOAD_FILE):
        print(f"[!] Error: Payload file '{PAYLOAD_FILE}' not found.")
        sys.exit(1)

    if not check_website_status(target_url):
        sys.exit(1)

    print(f"[*] Reading payload from '{PAYLOAD_FILE}'...")
    with open(PAYLOAD_FILE, 'r', encoding='utf-8') as f:
        glitch_script = f.read()

    print("[*] Launching browser with dark mode and console logging enabled...")
    
    driver = None
    try:
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--force-dark-mode")
        chrome_options.add_argument("--enable-features=WebUIDarkMode")
        chrome_options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        prefs = {
            "profile.default_content_setting_values.notifications": 2,
            "profile.managed_default_content_settings.images": 1
        }
        chrome_options.add_experimental_option("prefs", prefs)
        
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_page_load_timeout(20)

        print(f"[*] Navigating to {target_url}...")
        driver.get(target_url)
        
        time.sleep(1)

        print("[*] Injecting the GlitchArt payload...")
        if inject_payload_to_current_tab(driver, glitch_script, show_logs=True):
            print("[+] Payload injected successfully!")
        
        print("\n[*] Watcher activated - monitoring for navigation and new tabs")
        print("[*] Browser console logs will be displayed for debugging")
        print("[*] Close the browser window to exit\n")
        
        last_url = driver.current_url
        known_windows = set(driver.window_handles)
        check_counter = 0
        
        while True:
            try:
                current_url = driver.current_url
                current_windows = set(driver.window_handles)
                
                # Check for URL change in current tab
                if current_url != last_url and current_url:
                    print(f"[*] Navigation detected: {current_url[:60]}...")
                    time.sleep(0.8)
                    if inject_payload_to_current_tab(driver, glitch_script, show_logs=True):
                        print("[+] Re-injection complete")
                    last_url = current_url
                
                # Check for new tabs every 5 iterations
                check_counter += 1
                if check_counter >= 5:
                    check_counter = 0
                    if current_windows != known_windows:
                        new_windows = current_windows - known_windows
                        if new_windows:
                            print(f"\n[*] Detected {len(new_windows)} new tab(s)")
                            time.sleep(1.2)
                            inject_payload_to_all_tabs(driver, glitch_script, show_logs=True)
                            known_windows = current_windows
                
                time.sleep(0.5)
                
            except Exception as e:
                try:
                    current_windows = set(driver.window_handles)
                    if not current_windows:
                        break
                    known_windows = current_windows
                except:
                    break

    except WebDriverException:
        print("\n[*] Browser window closed by user.")
    except KeyboardInterrupt:
        print("\n[*] Script interrupted by user.")
    except Exception as e:
        print(f"\n[!] An unexpected error occurred: {e}")
    finally:
        if driver: 
            try:
                driver.quit()
            except:
                pass
        print("[*] Script finished. Exiting.")

if __name__ == "__main__":
    main()