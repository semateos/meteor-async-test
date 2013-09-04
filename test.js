if (Meteor.isClient) {

  Template.hello.events({

    'click input' : function () {

      //call the async function from the client
      Meteor.call("asyncJob", "async test", function(err, res){

        alert(res);

      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Future = Npm.require('fibers/future');
  });

  Meteor.methods({

    asyncJob: function(message) {

      //log the message to server
      console.log(message);

      // Set up a future
      var fut = new Future();

      // This should work for any async method
      setTimeout(function() {

        // Return the results
        fut['return'](message + " (delayed for 3 seconds)");

      }, 3 * 1000);

      // Wait for async to finish before returning
      // the result
      return fut.wait();
    }
  });
}
