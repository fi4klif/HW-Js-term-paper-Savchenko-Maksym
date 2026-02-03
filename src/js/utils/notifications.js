import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultConfig = {
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
};

export const showSuccess = (message) => {
    iziToast.success({
        ...defaultConfig,
        message: message,
        backgroundColor: '#242424',
        messageColor: '#F4F4F4',
        iconColor: '#EEA10C',
        progressBarColor: '#EEA10C',
    });
};

export const showError = (message) => {
    iziToast.error({
        ...defaultConfig,
        message: message,
        backgroundColor: '#E9003F',
        messageColor: '#F4F4F4',
        iconColor: '#F4F4F4',
        progressBarColor: '#F4F4F4',
    });
};