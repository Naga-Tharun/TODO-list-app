module.exports.home = function(req, res){
    // return res.end('<h1> Express is up for TODO list app');

    return res.render('home', {
        title: "TODO list"
    });
};