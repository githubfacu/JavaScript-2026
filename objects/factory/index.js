
const object = createObject("Facundo");
object.publicInstanceMethod();
object.publicInstanceMethod();
object.reset();
object.setName("Juan");
object.publicInstanceMethod();

function createObject(parameter) {
    let that = {
        name: parameter,
        count: 0,

        increment: function () {
            this.count++;
        },

        reset: function () {
            this.count = 0;
        },

        setName: function (name) {
            this.name = name;
        }
    };

    return {
        publicInstanceMethod: function () {
            that.increment();

            console.log(
                `name: ${that.name} - count: ${that.count}`
            );
        },

        reset: that.reset.bind(that),

        setName: that.setName.bind(that)
    };
}

const object = createObject("Facundo");
object.publicInstanceMethod();
object.publicInstanceMethod();
object.reset();
object.setName("Juan");
object.publicInstanceMethod();