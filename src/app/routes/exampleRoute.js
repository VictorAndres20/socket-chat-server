const router = require('express').Router();
const exampleController = require('../controller/ExampleController').buildClass();

router.get('/',(req, res) => {
    exampleController.exampleFunction(req, res);
});

module.exports = router;