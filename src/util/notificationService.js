



async function schedulePushNotification(title:any,body:any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here' },
      
    },
    trigger: { seconds:2},
     
  });
}