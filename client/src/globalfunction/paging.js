export default {
    methods: {
        isClass(param, current) {
            var isclass = '';
            if (param == current) {
                isclass = 'is-current';
            }
            return isclass;
        },
        isHiding(param, start, end) {
            var isclass = '';
            if (start == 0 && end == 0) {
                if (param > 5) {
                    isclass = 'is-hidden';
                }
            } else {
                if (param < start) {
                    isclass = 'is-hidden';
                }
                if (param > end) {
                    isclass = 'is-hidden';
                }
            }
            return isclass;
        },
        formatDate(param) {
            if (param == null) {
                return " ";
            }
            else {
                let str = param;
                let newstr = str.split(".")[0];
                let d = newstr.split("T")[0];
                let t = newstr.split("T")[1];

                newstr = d + " " + t;
                return newstr;
            }
        },
        formatDateAndTime() {
            var currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
            var date = new Date(currentDate);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

}