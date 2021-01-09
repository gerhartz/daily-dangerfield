// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});



module.exports.createJoke = async (event) => {
  let requestBody = JSON.parse(event.body);
  let joke = requestBody.joke;
  
  console.log('spot 1');
  await saveToDb(joke);
  console.log('spot 2');

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const saveToDb = (joke) => {
  console.log('inside saveToDb');
  return new Promise(resolve => {
    var timestamp = new Date().getTime();
    var params = {
      TableName: 'jokesTable',
      Item: {
        'id' : {S: uuid()},
        'joke' : {S: joke},
        'createdAt' : {N: timestamp.toString()},
        'updatedAt' : {N: timestamp.toString()}
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        resolve();
      }
    });
  });
};




/*

module.exports.createJoke = (event, context, callback) => {
  var requestBody = JSON.parse(event.body);
  var joke = requestBody.joke;
  console.log('joke = ', joke);



/*
  var params = {
    TableName: 'jokesTable',
    Item: {
      'joke' : {S: 'test joke'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };

  const response = await asyncFunction();
  return response;
};
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully, Paul',
      input: event,
    }),
  };

  callback(null, response);
  /*
  if(typeof joke !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit joke because of validation'));
    return;
  }

  submitJokeJ(jokeInfo(joke))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Successfully submitted joke with joke text: ${joke}',
          jokeId: res.id
        })
      })
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Unable to submit joke with joke text ${joke}'
        })
      })
    });
    



const submitJoke = jokeInfo => {
  console.log('Submitting joke info');
  var params = {
    TableName: 'CUSTOMER_LIST',
    Item: {
      'CUSTOMER_ID' : {N: '001'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

*/