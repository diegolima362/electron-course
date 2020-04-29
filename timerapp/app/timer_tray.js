const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;

        this.setToolTip('Timer App');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        const { x, y } = bounds;
        const { width, height } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y === 0 ? y : y - height;
            const xPosition = x === 0 ? width : x - Math.round(width / 2);

            this.mainWindow.setBounds({
                x: xPosition,
                y: yPosition,
                width,
                height
            });

            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([{
            label: 'Quit',
            click: () => { app.quit(); }
        }]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;