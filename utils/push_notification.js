var FCM = require("fcm-node");
var serverKey =
  "AAAAr3DhkFs:APA91bHZqonDkEArzNKUDs1dXockouHhmKDExp_pLn7NhLJ3f6nWFSBBlLuc7EDibk6dXkgU59PxEFn_J2tPKWiTnwlE6SNhK9cXoM50u9WyBmsadmtAP6jLoorF-DObRgDsU2AzT7GY"; //put your server key here
var fcm = new FCM(serverKey);

const push_notifications = (notification_obj) => {
  var message = {
    to: notification_obj.to,
    collapse_key: "your_collapse_key",

    notification: {
      title: notification_obj.notification_title,
      body: notification_obj.notification_body,
    //   sender_id: notification_obj.sender_id,
    //   receiver_id: notification_obj.receiver_id,
    //   route_id: notification_obj.route_id,
    //   sender_name: notification_obj.sender_name,
    //   sender_image: notification_obj.sender_image,
    //   notification_title: notification_obj.notification_title,
    //   notification_body: notification_obj.notification_body,
    //   notification_type: notification_obj.notification_type,
    //   notification_route: notification_obj.notification_route,
    },

    data: {
      //you can send only notification or only data(or include both)
      //   sender_object: notification_obj.sender_objects,
      //   receiver_object: notification_obj.receiver_objects,
      sender_id: notification_obj.sender_id,
      receiver_id: notification_obj.receiver_id,
      route_id: notification_obj.route_id,
      sender_name: notification_obj.sender_name,
      sender_image: notification_obj.sender_image,
      notification_title: notification_obj.notification_title,
      notification_body: notification_obj.notification_body,
      notification_type: notification_obj.notification_type,
      notification_route: notification_obj.notification_route,
      //   sender_object: JSON.parse(notification_obj.sender_objects),
      //   receiver_object: JSON.parse(notification_obj.receiver_objects)
    },
  };
  console.log("message:", message);
  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = { push_notifications };
