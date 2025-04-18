import gettext
import subprocess
import shutil  # For checking if Git is in PATH

# Set up message catalog access
locales_dir = './locales'  # Directory where translation files are stored
language = 'es'  # Desired language code (e.g., 'es' for Spanish, 'fr' for French)

try:
    translation = gettext.translation('messages', localedir=locales_dir, languages=[language])
    translation.install()
    _ = translation.gettext
except FileNotFoundError as e:
    print(f"Warning: Translation file not found for language '{language}'. Falling back to default language.")
    print(f"Details: {e}")
    _ = gettext.gettext

# Example usage
try:
    print(_("Hello, world!"))
except Exception as e:
    print(f"Error during translation: {e}")

# Check if Git is available
git_path = shutil.which("git")
if git_path:
    print(f"Git is available at: {git_path}")
else:
    print("Git is not installed or not found in PATH.")

# Additional Git error handling
def check_git_object(hash):
    # Check if Git is available
    if not shutil.which("git"):
        print(_("Error: Git is not installed or not found in PATH."))
        return

    try:
        result = subprocess.run(
            ["git", "show", "-s", hash],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(_("Error: Unable to find the Git object."))
        print(_("Details: ") + e.stderr)
    except Exception as e:
        print(_("An unexpected error occurred while checking the Git object."))
        print(f"Details: {e}")

# Example usage of Git error handling
try:
    check_git_object("1b19641081101676cf874f3e3cccc453232ee22c")
except Exception as e:
    print(f"Error during Git object check: {e}")