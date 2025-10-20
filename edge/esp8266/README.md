# ESP8266

## Setup

1. Download and install the [Arduino IDE](https://www.arduino.cc/en/software).
2. Install the ESP8266 Arduino Core: Go to `File` > `Preferences`. In the `Settings` Tab enter the following URL into `Additional Boards Manager URLs`: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`.
3. Install the ESP8266 Boards: Go to `Tools` > `Board:(Your current board selection)` > `Boards Manager...`. Search for `esp8266`.
4. Install the necessary libraries: Go to `Tools` > `Manage Libraries...`. In the Librariy Manager search and install:
   - PubSubClient
   - NTPClient
   - DHT sensor library
5. Select `NodeMCU 0.9 (ESP-12 Module)` as board.
6. Change the values in the `secrets.h`file.
7. Connect the ESP8266 development board and the DHT11 sensor as shwon in the image below:
   - RST to D0 (enables wake up from deep sleep)
   - 3V3 to Vin of DHT11
   - GND to GND of DHT11
   - D5 to S of DHT11 (data)
<div align="center">
  <img width=300 src="../../img/esp8266.png" alt="architecture">
</div>