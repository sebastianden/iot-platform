# M5Stack Core 2

## Setup

1. Download the [M5Burner Tool](https://docs.m5stack.com/en/download)
2. Flash the UIFlow program on the M5Stack Core using the Burner (Important: Use UIFlow 1 as UIFlow 2 does not support AWS IoT Core as of now)
3. Go to [UIFlow](https://flow.m5stack.com/)
4. Upload the `main.m5f` file in this folder
5. Add the Wi-Fi SSID and Password in the "Connect to Wi-Fi" block
6. Add the AWS IoT Core host name in the AWS MQTT block and upload the `keyFile` (`private.pem.key`) and the `certFile` (`certificate.pem.crt`)
7. Download the program to the M5Stack Core2