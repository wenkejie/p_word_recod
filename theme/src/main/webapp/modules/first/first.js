define(["avalon", "text!./first.html"], function(avalon, first) {
    avalon.templateCache.first = first
    var model = avalon.define({
        $id: "first",
        firstName: "施",
        lastName: "杰锋",
        fullName: {//一个包含set或get的对象会被当成PropertyDescriptor，
            set: function(val) {//里面必须用this指向scope，不能使用scope
                var array = (val || "").split(" ");
                this.firstName = array[0] || "";
                this.lastName = array[1] || "";
            },
            get: function() {
            	return this.firstName + " " + this.lastName;
            }
        },
        arr: ["aaa", 'bbb', "ccc", "ddd"],
        selected: ["bbb", "ccc"],
        checkAllbool: false,
        checkAll: function() {
            if (this.checked) {
                model.selected = model.arr
            } else {
                model.selected.clear()
            }
        }
    })
    model.checkAllbool = model.arr.length === model.selected.length
    model.selected.$watch("length", function(n) {
        model.checkAllbool = n === model.arr.size()
    })
    avalon.vmodels.root.page = "first"
})
