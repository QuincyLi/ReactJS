import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', csrfToken: req.csrfToken() });
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
    if (req.body.userName != '' && req.body.password != '') {
        res.json({ success: 1 });
    }else{
        var err = new Error('Anthentication failed');
        err.status = 500;
        next(err);
    }
});

router.post('/test', function (req, res, next) {
    console.log(req.body);
    res.json({ success: 1 });
});

export default router;