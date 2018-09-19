'use strict';


module.exports = (app, db) => {

  //home router;
  app.get('/', (req,res) =>{
    res.sendFile('..../public/index.html');
  });

  //a function checking if an element is in array
  var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
  };

  //a list of permission numbers;
  var pm = [123,234,345,456,567,678,789];

  //login with permission number
  app.get('/api/login', function (req,res) {
    var needle = Number(req.query.permission_number);
    if (contains.call(pm, needle)){
      res.json({
        "status":"success",
        "error": "",
        "permission_number": String(needle)
      })
    }
    else{
      res.json({
        "status":"error",
        "error":"permission number is not valid!",
        "permission_number":req.query.permission_number
      })
    }
  });

  //update an exising restaurant by its id;
  app.put('/api/restaurants/:id', function(req, res) {
   db.restaurants.findOne({
     where: {
       id: req.params.id
     }
   }).then(function(restaurant) {
    if(restaurant){
      restaurant.updateAttributes({
        id: req.params.id,
        name: req.body.name,
        location: req.body.location,
        origin: req.body.origin,
        time: req.body.time
      }).then(function(rest) {
       res.json({
         "status":"success",
         "error":""
       })
     });
    }
    else{
       res.json({
        "status":"error",
         "error":"no such restaurant exists!"
       })
     }
   }).catch (function (err){
     res.json({
      "status":"error",
      "error":"an unexpected error has occur, please try again!"
      })
    });
  });

//update an existing offering by its id
  app.put('/api/offering/:id', function(req, res) {
   db.offerings.findOne({
     where: {
       id: req.params.id
     }
   }).then(function(offering) {
     if(offering){
       offering.updateAttributes({
         offering_name: req.body.offering_name,
         offering_price: req.body.offering_price,
       }).then(function(off) {
         res.json({
           "status":"success",
           "error":""
         })
       });
     }
     else{
       res.json({
         "status":"error",
         "error":"no such offering exists!"
       })
     }
      }).catch (function (err){
        res.json({
          "status":"error",
          "error":"an unexpected error has occur, please try again!"
        })
      });
    });
  //delete an existing restaurant by id;
  app.delete('/api/restaurants/:id', function (req, res){
    db.restaurants.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(restaurant){
      var success = "success";
      var error = "";
    //console.log(resObj);
      if (restaurant <= 0){
         success = "error";
         error = "no such restaurant exists!"
       }
       res.json({
         "status":success,
         "error": error,
         "restaurant_id":req.params.id
       });
     }).catch (function (err){
       res.json({
         "status":"error",
         "error":"an unexpected error has occur, please try again!"
       })
    });
  });

  //delete an existing offering by id
  app.delete('/api/offering/:id', function(req, res) {
    db.offerings.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(offering) {
      var success = "success";
      var error = "";
      if (offering <=0){
        success = "error";
        error = "no such offering exists!"
      }
      res.json({
        "status":success,
        "error": error
      });
    }).catch (function (err){
      res.json({
        "status":"error",
        "error":"an unexpected error has occur, please try again!"
      })
    });
  });

  //add a new restaurant;
  app.post('/api/restaurants/', function (req, res){
    db.restaurants.create({
      name: req.body.name,
      location: req.body.location,
      origin: req.body.origin,
      time:req.body.time,
      rating: req.body.rating
    }).then(restaurant => {
      const resObj =  Object.assign(
        {},
        {
          id: restaurant.id,
          name: restaurant.name,
          location:restaurant.location,
          origin:restaurant.origin,
          time: restaurant.time, //waiting for database update
        }
      )
      var success = "success";
      var error = "";
      res.json({
        "status":success,
        "error":error,
        "data":resObj
      });
    }).catch (function (err){
      res.json({
      "status" : "error",
      "error": "an unexpected error has occured, please try again!"
    })
    });
  });

  //add some new offerings (w/ transaction)
  app.post('/api/offering/', function(req,res){
    var res_id = req.body.restaurant_id;
    var off = req.body.offerings;
    console.log(off);
    db.sequelize.transaction(function (t){
      var offList = [];
      for (var i = 0; i < off.length; i++){
        var newOff = db.offerings.create({
          restaurant_id: req.body.restaurant_id,
          offering_name: off[i].offering_name,
          offering_price: off[i].offering_price
        },{transaction:t});
        offList.push(newOff);
      };
      return Promise.all(offList);
    }).then(function(offering){
      res.json({
        "status":"success",
        "error": "",
        "result":offering
      });
    }).catch (function (err){
      res.json({
        "status":"error",
        "info" : err,
        "error": "an error has occured! Please try again."
      })
    });
  });

  //get a restaurant by id
  app.get('/api/restaurants/:id', (req,res) =>{
    console.log("params");
    db.restaurants.findOne({
      where:{
        id:req.params.id
      },
      include:[
        {
          model:db.offerings,
        }
      ]
    }).then(restaurant =>{
      const resObj = Object.assign(
          {},
          {
            id: restaurant.id,
            name: restaurant.name,
            location:restaurant.location,
            origin:restaurant.origin,
            time: restaurant.time,
            offering:restaurant.offerings.map(offering =>{
              return Object.assign(
                {},
                {
                  offering_id:offering.id,
                  offering_name:offering.offering_name,
                  offering_price:offering.offering_price
                }
              )
            })
          }
        )

      var success = "success";
      var error = "";
      //console.log(resObj);
      if (resObj.length <= 0){
           success = "error";
           error = "The restaurant does not exist";
      }
      res.json({
        "status":success,
        "error":error,
        "data":resObj
      });
    }).catch (function(err){
      res.json({
        "status":"error",
        "error": "an error has occured! Please try again."
      })
    });
  });

  // 1. get all restaurants
  // 2. get all restaurants (and its offerings), contains name as a substring
  app.get('/api/restaurants/',(req,res) => {
    console.log("query parameter: ");
    var param_name = req.query.name;
    if (param_name === undefined){
      db.restaurants.findAll({}).then(restaurants => {
        const resObj = restaurants.map(restaurant =>{
          return Object.assign(
            {},
            {
              id: restaurant.id,
              name: restaurant.name,
              location:restaurant.location,
              origin:restaurant.origin,
              time:restaurant.time,
            }
          )
        });
        var success = "success";
        var error = "";
        //console.log(resObj);
        if (restaurants.length <= 0){
  			     success = "error";
  			     error = "The restaurant does not exist";
  		  }
        res.json({
          "status":success,
          "error":error,
          "data":resObj
        });
      }).catch (function (err){
        res.json({
          "status":"error",
          "error": "an error has occured! Please try again."
        })
      });
    }
    else{
      console.log('in name');
      db.restaurants.findAll({
        where:{
          name:{
            $like:'%'+param_name+'%'
          }
        },
        include:[
          {
            model:db.offerings,
          }
        ]
      }).then(restaurants =>{
        const resObj = restaurants.map(restaurant =>{
          return Object.assign(
            {},
            {
              id: restaurant.id,
              name: restaurant.name,
              location:restaurant.location,
              origin:restaurant.origin,
              time: restaurant.time, //waiting for database update
              offering:restaurant.offerings.map(offering =>{
                return Object.assign(
                  {},
                  {
                    offering_id: offering.id,
                    offering_name:offering.offering_name,
                    offering_price:offering.offering_price
                  }
                )
              })
            }
          )
        });
        var success = "success";
        var error = "";
        //console.log(resObj);
        if (resObj.length <= 0){
  			     success = "error";
  			     error = "No restaurants exist!";
  		  }
        res.json({
          "status":success,
          "error":error,
          "data":resObj
        });
      }).catch (function (err){
        res.json({
          "status":"error",
          "error": "an error has occured! Please try again."
        })
      });
    }
  });


  function formData(resObj){
    var dictionary = [];
    var lastName = "";
    var count = 0;
    for (var i = 0; i < resObj.length; i++){

      var restName = resObj[i].restaurant_name;
      var restLoc = resObj[i].restaurant_location;
      var restOrigin = resObj[i].restaurant_origin;
      var offName = resObj[i].offering_name;
      var offPrice = resObj[i].offering_price;
      var resId = resObj[i].restaurant_id;
      var restTime = resObj[i].restaurant_time;
      var off = {offering_name: offName, offering_price: offPrice};
      if (i == 0){
        var offering = [];
        var restaurant = {id: resId, name: restName, location: restLoc, origin: restOrigin, time: restTime, specific_offering:offering};
        dictionary.push(restaurant);
      }
      if (i != 0 && restName != lastName){
        var offering = [];
        count = count + 1;
        var restaurant = {id: resId, name: restName, location: restLoc, origin: restOrigin, time: restTime, specific_offering:offering};
        dictionary.push(restaurant);
      }
      dictionary[count]['specific_offering'].push(off);
      lastName = restName;
    }
    return dictionary;
  }

  //api for search a specific food;
  app.get('/api/offering',(req,res) =>{
    console.log("query parameter: ");
    console.log(req.query.name);
    db.offerings.findAll({
      where:{
        offering_name:{
          $like:'%'+req.query.name+'%'
        }
      },
      include:[
        {
          model:db.restaurants,//[[sequelize.fn('DISTINCT', sequelize.col('name')), 'alias_name']],
        }
      ]
    }).then(offerings => {
      const resObj = offerings.map(offering =>{
        return Object.assign(
          {},
          {
            offering_id:offering.id,
            offering_name:offering.offering_name,
            offering_price:offering.offering_price,
            restaurant_name:offering.restaurant.name,
            restaurant_location:offering.restaurant.location,
            restaurant_origin:offering.restaurant.origin,
            restaurant_id:offering.restaurant.id,
            restaurant_time:offering.restaurant.time
          }
        )
      });
      var success = "success";
      var error = "";
      //console.log(resObj);
      //console.log("=========================");
      //console.log(formData(resObj));
      var result = formData(resObj);
      if (resObj.length <= 0){
  			success = "error";
  			error = "There is no such offering at Duke";
  		}

      res.json({
        "status":success,
        "error":error,
        "data":result,
      });
    }).catch (function (err){
      res.json({
        "status":"error",
        "error": "an error has occured! Please try again."
      })
    });
  });

};
