import com.sun.jna.NativeLibrary;
import com.sun.jna.platform.win32.User32;
import com.sun.jna.platform.win32.WinDef.POINT;

import java.awt.Robot;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.awt.event.KeyEvent;
import java.util.Scanner;

/** Simple example of using JNA to interact with native UI. */
public class PollSelector {
    // Define some constants
    final int POLL_COLOR = 0x800080; // Replace with the actual poll color
    final int CHECKBOX_COLOR = 0xFFFFFF; // Replace with the actual checkbox color
    final int KEYEVENTF_KEYUP = 0x0002; // Flag for releasing a key

    public interface CLibrary extends Library {
        CLibrary INSTANCE = (CLibrary) Native.loadLibrary((Platform.isWindows() ? "msvcrt" : "c"), CLibrary.class);
        void printf(String format, Object... args);
    }

    public static void main(String[] args) {
        try {
            // Use a try-with-resources statement to handle the Robot and Scanner instances
            try (Robot robot = new Robot(); Scanner scanner = new Scanner(System.in)) {
                // Ask the user which option to select
                System.out.println("Which option do you want to select? (A, B, C, or D)");
                String option = scanner.nextLine().toUpperCase();

                // Validate the input and get the corresponding key code
                int optionKey;
                switch (option) {
                    case "A":
                        optionKey = KeyEvent.VK_A;
                        break;
                    case "B":
                        optionKey = KeyEvent.VK_B;
                        break;
                    case "C":
                        optionKey = KeyEvent.VK_C;
                        break;
                    case "D":
                        optionKey = KeyEvent.VK_D;
                        break;
                    default:
                        System.out.println("Invalid option. Please enter A, B, C, or D.");
                        return;
                }

                // Use a smaller screen size or a smaller region of interest for capturing the screen image
                int screenWidth = 800;  // Replace with your desired screen width
                int screenHeight = 600;  // Replace with your desired screen height
                int screenX = 0;  // Replace with your desired screen X coordinate
                int screenY = 0;  // Replace with your desired screen Y coordinate

                // Loop until the poll is detected
                boolean pollDetected = false;
                while (!pollDetected) {
                    // Capture the screen image
                    BufferedImage screenImage = robot.createScreenCapture(new Rectangle(screenX, screenY, screenWidth, screenHeight));

                    // Scan the screen image for the poll color or the checkbox color or the option text
                    for (int x = 0; x < screenWidth; x++) {
                        for (int y = 0; y < screenHeight; y++) {
                            // Get the pixel color at (x, y)
                            int pixelColor = screenImage.getRGB(x, y);

                            // Compare the pixel color with the poll color or the checkbox color
                            if (pixelColor == POLL_COLOR || pixelColor == CHECKBOX_COLOR) {
                                // Poll detected, break the loop
                                pollDetected = true;
                                break;
                            }

                            // Get the pixel text at (x, y)
                            String pixelText = getPixelText(screenImage, x, y);

                            // Compare the pixel text with the option text
                            if (pixelText.equals("A") || pixelText.equals("B") || pixelText.equals("C") || pixelText.equals("D")) {
                                // Poll detected, break the loop
                                pollDetected = true;
                                break;
                            }
                        }
                        if (pollDetected) {
                            break;
                        }
                    }

                    // Use a lower wait time or a more adaptive wait time for scanning the screen image again
                    double waitTimeMs = 0.10;  // Replace with your desired wait time in milliseconds
                    Thread.sleep((long)waitTimeMs);
                }

                // Press the desired option key using Java Native Access
                NativeLibrary.getInstance("user32");
                User32 user32 = User32.INSTANCE;
                user32.keybd_event((byte) optionKey, (byte) 0, 0, 0);
                user32.keybd_event((byte) optionKey, (byte) 0, KEYEVENTF_KEYUP, 0);

                // Move the mouse cursor to the submit button's location using Java Native Access
                int submitButtonX = 100;  // Replace with the actual X coordinate
                int submitButtonY = 100;  // Replace with the actual Y coordinate

                // Get the current mouse position
                POINT mousePos = new POINT();
                user32.GetCursorPos(mousePos);

                // Calculate the absolute coordinates of the submit button relative to the screen
                int absoluteX = mousePos.x + submitButtonX - screenX;
                int absoluteY = mousePos.y + submitButtonY - screenY;

                // Move the mouse cursor to the submit button's location
                user32.SetCursorPos(absoluteX, absoluteY);

                // Simulate a mouse click on the button
                user32.mouse_event(User32.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
                user32.mouse_event(User32.MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Implement the getPixelText method that extracts the text from a pixel on the screen image
    public static String getPixelText(BufferedImage screenImage, int x, int y) {
        // Use a library like Tesseract or OpenCV to perform OCR on the image
        // For simplicity, we assume that the text is always one character and is aligned with the pixel
        // This is not a robust solution and may not work in all cases

        // Create a subimage of size 1x1 around the pixel
        BufferedImage subImage = screenImage.getSubimage(x, y, 1, 1);

        // Use Tesseract to recognize the text from the subimage
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("path/to/tessdata"); // Replace with your actual path to tessdata folder
        tesseract.setLanguage("eng"); // Set the language to English
        try {
            String text = tesseract.doOCR(subImage);
            return text.trim(); // Remove any whitespace from the text
        } catch (TesseractException e) {
            e.printStackTrace();
            return ""; // Return an empty string if OCR fails
        }
    }
}
