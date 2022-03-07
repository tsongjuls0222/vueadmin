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
    },

}