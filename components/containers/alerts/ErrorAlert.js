import Toast from 'react-native-root-toast';

export default class ErrorAlert {
    /**
     *
     * @param message {string}
     * @param duration {ErrorAlert.durations}
     * @param position {ErrorAlert.positions}
     * @param shadow {boolean}
     * @param animation {boolean}
     * @param hideOnPress {boolean}
     * @param delay {number}
     */
    constructor(
        message,
        duration = ErrorAlert.durations.LONG,
        position = ErrorAlert.positions.BOTTOM,
        shadow = true,
        animation = true,
        hideOnPress = true,
        delay = 0
    ) {
        this._delay = delay;
        this._message = message;
        this._duration = duration;
        this._position = position;
        this._shadow = shadow;
        this._animation = animation;
        this._hideOnPress = hideOnPress;
    }

    show() {
        Toast(this._message, {
            duration: this._duration,
            position: this._position,
            shadow: this._shadow,
            animation: this._animation,
            hideOnPress: this._hideOnPress,
            delay: this._delay,
        });
    }

    static durations = {
        ...Toast.durations,
    };
    static positions = {
        ...Toast.positions,
    };
}
