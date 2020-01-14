class ExampleController{

    exampleFunction(req, res) {
        res.status(200).send("Hello my dear!!");
        /** If you have middleware body-parser */
        /*
        res.status(200).json({
            ok:true
        });
        */
    }
}

const buildClass = () => {
    return new ExampleController();
}

module.exports = {buildClass};