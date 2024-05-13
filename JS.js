var mb=tg.MainButton;
mb.text="Надіслати";
mb.show();
//documet.getElementById('people_name').innerHtml=window.Telegram.WebApp.initDataUnsafe.user.id;
document.getElementById('people_name').innerHtml+=window.Telegram.WebApp.initDataUnsafe.user.first_name+" ";
document.getElementById('people_name').innerHtml+=window.Telegram.WebApp.initDataUnsafe.user.last_name+" ";
