function changeLayoutColor(color: 'white' | 'primary') {
    if(color == 'white') {
        document.documentElement.style.setProperty('--layout-background', '0 0% 100%');
    }
    if(color == 'primary') {
        document.documentElement.style.setProperty('--layout-background', '207 12% 85%');
    }
};

export default changeLayoutColor;
