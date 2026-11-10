# OpenPLC_Arduino_PKG

Arduino board package for the OpenPLC board (STM32H743IIKx), based on the STM32duino core 2.4.0.

## Install

1. Arduino IDE → File → Preferences → *Additional boards manager URLs*, add
   `https://raw.githubusercontent.com/OpenPLCs/OpenPLC_Arduino_PKG_Json/master/package_openplc_alp_index.json`
2. Tools → Board → Boards Manager, install **OpenPLC_Alpha**.
3. Restart Arduino IDE 2 once. Installing the package also adds a small IDE extension (`~/.arduinoIDE/plugins/openplc-identify`) that blinks LED3 on the board you pick in the port list; uninstalling the package removes it.

## Documentation

The product design documents are in [OpenPLC_Instruction](https://github.com/OpenPLCs/OpenPLC_Instruction).

## License

Upstream code: [License.md](License.md). The OpenPLC libraries in `libraries/OpenPLC_*`: [LICENSE-OpenPLC.md](LICENSE-OpenPLC.md).
