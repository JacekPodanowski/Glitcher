import sys
import os
import time
import requests
import json
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException, TimeoutException, JavascriptException

# --- Configuration ---
PAYLOAD_FILE = "glitch_payload.js"

# --- Shared Headers for Anti-Bot Evasion ---
# Using a consistent set of headers for both requests and WebDriver
BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.google.com/',
    'DNT': '1', # Do Not Track
    'Upgrade-Insecure-Requests': '1'
}

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
        # --- FIX for 403 Forbidden Error ---
        # Using the enhanced, consistent browser headers for the initial check.
        print("[*] Checking website status with enhanced headers...")
        response = requests.head(url, allow_redirects=True, timeout=10, headers=BROWSER_HEADERS)
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
        WebDriverWait(driver, timeout).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
        return True
    except TimeoutException:
        print("[!] Page failed to reach ready state 'complete'.")
        return False

def inject_payload_to_current_tab(driver, glitch_script, show_logs=False):
    """
    Inject payload to current tab, wait for it to initialize, and then verify.
    """
    try:
        # Wait for page to be ready
        if not wait_for_page_ready(driver):
            print("[!] Page not fully loaded, injecting anyway...")

        # Apply dark theme first
        apply_dark_theme_css(driver)

        # --- FIX for Injection Logic ---
        # 1. Inject the script. It will start loading its dependencies asynchronously.
        driver.execute_script(glitch_script)
        print("[*] Payload script injected. Waiting for GlitchArt library to initialize...")

        # 2. Wait explicitly for the 'window.GlitchArt' object to be defined.
        # This solves the race condition where we check for the library before it has loaded.
        try:
            WebDriverWait(driver, 15).until(
                lambda d: d.execute_script("return typeof window.GlitchArt !== 'undefined'")
            )
            print("[+] GlitchArt library is now loaded in the page context.")
        except TimeoutException:
            # If the wait fails, the library never loaded properly.
            print("[!] FATAL: Timed out waiting for GlitchArt library to initialize.")
            print("    This could be due to a Content Security Policy (CSP) on the website,")
            print("    a network issue blocking dependency loading, or an error in the payload.")
            if show_logs:
                print_browser_logs(driver, driver.title[:30])
            return False

        # 3. Now that we know the library exists, verify its functions.
        verification = driver.execute_script("""
            return {
                glitchArtExists: typeof window.GlitchArt !== 'undefined',
                html2canvasLoaded: typeof html2canvas !== 'undefined',
                libraryFunctions: window.GlitchArt ? Object.keys(window.GlitchArt) : []
            };
        """)

        if verification['glitchArtExists']:
            print(f"[✓] Verification successful. GlitchArt functions available: {', '.join(verification['libraryFunctions'])}")
        else:
            # This should ideally not be reached due to the explicit wait above.
            print("[!] WARNING: GlitchArt library was found but disappeared during verification!")

        if show_logs:
            time.sleep(0.5)
            print_browser_logs(driver, driver.title[:30])

        return True
    except JavascriptException as e:
        print(f"[!] Failed to inject script into '{driver.title[:50]}'. The website's security policy may be blocking it.")
        print(f"  Error details: {e.msg.splitlines()[0]}") # Print a concise error message
        if show_logs:
            print_browser_logs(driver, driver.title[:30])
        return False
    except WebDriverException as e:
        print(f"[!] A browser error occurred during injection: {e}")
        return False

def inject_payload_to_all_tabs(driver, glitch_script, show_logs=False):
    """
    Inject payload to all open tabs with proper window handling
    """
    original_window = driver.current_window_handle
    all_windows = driver.window_handles
    injected_count = 0

    print(f"[*] Found {len(all_windows)} tabs. Attempting to inject into all...")

    for window in all_windows:
        try:
            driver.switch_to.window(window)
            time.sleep(0.3)
            title = driver.title or "Untitled Tab"
            print(f"\n--- Processing Tab: {title[:60]} ---")

            if "chrome://" in driver.current_url:
                print("[!] Skipping internal Chrome page.")
                continue

            if inject_payload_to_current_tab(driver, glitch_script, show_logs):
                injected_count += 1
                print(f"[+] Injection successful for: {title[:50]}")
            else:
                print(f"[-] Injection failed for: {title[:50]}")

        except Exception as e:
            print(f"[!] Error switching to or processing tab: {e}")

    print(f"\n[+] Finished processing. Successfully injected into {injected_count}/{len(all_windows)} tabs.")

    try:
        driver.switch_to.window(original_window)
    except:
        if all_windows:
            try:
                driver.switch_to.window(all_windows[0])
            except: pass

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

    print("[*] Configuring browser for stealth and performance...")
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--force-dark-mode")
    chrome_options.add_argument("--enable-features=WebUIDarkMode")
    chrome_options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    
    # --- FIX for Anti-403 Masking ---
    # 1. Use the same User-Agent as the requests check for consistency.
    chrome_options.add_argument(f"user-agent={BROWSER_HEADERS['User-Agent']}")
    
    # 2. Disable flags that can reveal automation.
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation", "enable-logging"])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    prefs = {
        "profile.default_content_setting_values.notifications": 2,
        "profile.managed_default_content_settings.images": 1,
        "credentials_enable_service": False,
        "profile.password_manager_enabled": False
    }
    chrome_options.add_experimental_option("prefs", prefs)

    driver = None
    try:
        driver = webdriver.Chrome(options=chrome_options)
        
        # --- FIX for Anti-403 Masking ---
        # 3. Hide the `navigator.webdriver` flag before any page scripts execute.
        # This is a powerful technique to appear as a standard browser.
        driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        })
        
        driver.set_page_load_timeout(30) # Increased timeout for slower pages

        print(f"[*] Navigating to {target_url}...")
        driver.get(target_url)

        print("[*] Injecting the initial GlitchArt payload...")
        if inject_payload_to_current_tab(driver, glitch_script, show_logs=True):
            print("\n[+] Initial payload injection was successful!")
        else:
            print("\n[!] Initial payload injection failed. The watcher will still run.")


        print("\n[*] Watcher activated - monitoring for navigation and new tabs")
        print("[*] Browser console logs will be displayed for debugging")
        print("[*] Close the browser window to exit\n")

        last_url = driver.current_url
        known_windows = set(driver.window_handles)
        check_counter = 0

        while True:
            try:
                current_windows = set(driver.window_handles)
                if not current_windows:
                    break 

                # Check for new tabs
                if current_windows != known_windows:
                    new_windows = current_windows - known_windows
                    if new_windows:
                        print(f"\n[*] Detected {len(new_windows)} new tab(s). Waiting for them to load...")
                        time.sleep(1.5) # Give new tabs a moment to start loading
                        inject_payload_to_all_tabs(driver, glitch_script, show_logs=True)
                        known_windows = current_windows
                        last_url = driver.current_url # Reset URL to avoid immediate re-injection

                # Check for URL change in current tab
                current_url = driver.current_url
                if current_url != last_url and current_url and "chrome://" not in current_url:
                    print(f"[*] Navigation detected: {current_url[:70]}...")
                    if inject_payload_to_current_tab(driver, glitch_script, show_logs=True):
                        print("[+] Re-injection complete.")
                    last_url = current_url

                time.sleep(1) 

            except WebDriverException:
                break
            except Exception as e:
                print(f"[!] Error in watcher loop: {e}")
                try:
                    known_windows = set(driver.window_handles)
                except:
                    break

    except WebDriverException as e:
        if "net::ERR_NAME_NOT_RESOLVED" in str(e):
             print(f"\n[!] DNS Error: Could not resolve the host: {target_url}")
        else:
             print("\n[*] Browser window closed or crashed.")
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