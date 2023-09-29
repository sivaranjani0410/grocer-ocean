const express = require("express");
const router = express.Router();
const signUpTemp = require("../Schema/schema");
const products = require("../Schema/productSchema");

//Handling signup
router.post("/signup", async (req, res) => {
  try {
    // if (req.body.UserName === "") {
    //   return res.json({ status: "enter user name" });
    // }
    // if (req.body.Email === "") {
    //   return res.json({ status: "enter email" });
    // }
    // if (req.body.PassWord === "") {
    //   return res.json({ status: "enter password" });
    // }
    console.log(req.body);
    const oldUserName = await signUpTemp.findOne({
      UserName: req.body.UserName,
    });
    const oldEmail = await signUpTemp.findOne({ Email: req.body.Email });

    if (oldUserName || oldEmail) {
      if (oldUserName) {
        return res.json({ status: "username already exist" });
      }
      if (oldEmail) {
        return res.json({ status: "email already exist" });
      }
    }
    if (!oldUserName || !oldEmail) {
      const user = await signUpTemp.create({
        UserName: req.body.UserName,
        Email: req.body.Email,
        PassWord: req.body.PassWord,
      });
      if (user) {
        return res.json({ status: "user created", user });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//feedback
router.post('/userfeedback', async(req,res)=>{
  try{
    const{userId,feedback}=req.body
const user= await signUpTemp.findByIdAndUpdate({_id:userId},{FeedBack:feedback});

if (user) {
  return res.json({ status: "feedback submitted", user });
}
  }catch(err){
    console.log(err.message);
  }
})


//Handling Login
router.post("/login", async (req, res) => {
  const { UserName, PassWord } = req.body;

  try {
    const name = await signUpTemp.findOne({ UserName: UserName });
    const pass = await signUpTemp.findOne({ PassWord: PassWord });

    if (name && pass) {
      res.json({ status: "exist", user: name });
    } else if (name || pass) {
      res.json({ status: "Wrong Data" });
    } else {
      res.json({ status: "not-exist" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

//add-product
router.post("/addProduct", (req, res) => {
  const productDetail = req.body;
  console.log(productDetail);

  products.create(productDetail);
});

//getProduct
router.get("/getProducts/:category", async (req, res) => {
  try {
    const getData = await products.find({ category: req.params.category });
    res.json(getData);
    
  } catch (err) {
    res.send(err);
    
  }

});

//add-orderedData
router.post("/placeorder", async (req, res) => {
  try {
    const { cart, totalQuantity, totalPrice, userId } = req.body;
    await signUpTemp.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          Orders: {
            orderedProducts: cart,
            orderedTotalQuantity: totalQuantity,
            orderedTotalPrie: totalPrice,
            orderedDate:Date.now()
          },
        },
      }
    );
    const user =await signUpTemp.findById({_id:userId})
    return res.json({status:'product ordered',order:user.Orders})
  } catch (err) {
    console.log(err);
  }
});

router.post('/getuserorders', async(req,res)=>{
  try {
    const { userId } = req.body;
    if(userId){
      const user =await signUpTemp.findById({_id:userId})
      return res.json({status:'success',order:user.Orders})
    }else{
       return res.json({status:'failed userorders'})
    }
  
  } catch (err) {
    console.log(err);
  }
})


//allproducts
router.get("/products", async (req, res) => {
  try {
    const getData = await products.find({});
    res.json(getData);
  } catch (err) {
    res.send(err);
  }
});

//searchproducts

router.get("/searchproducts/:search", async (req, res) => {
  try {
    const getData=[]
    const {search}=req.params
    getData.push(...await products.find({'title':{$regex:search,$options:'i'}}))
   getData.push(... await products.find({'category':{$regex:search,$options:'i'}}))
    res.json(getData);
   
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
