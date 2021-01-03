class myCookie{
  values=[];

  constructor(){
    this.updateValues();
  }

  //value объект с возможными, но не всеми обязательными полями
  /*{
    name:“имя cookie", 
    value:"значение", 
    domain:"Домен", 
    path:"/путь", 
    samesite:"strict", 
    secure:true, 
    maxAge:"3600",
    expires:"Thu Oct 29 2010 21:52:48 GMT"
    }
  */

add(value){
    //Добавляет cookie из полученного описания имя, значения и настроек
    //обновляет текущие значения объекта values
    let str = '';
    let obj = {};
    for (let val in value){
        if (val == 'name' || val == 'value'){
              obj[val] = value[val];
              if (val == 'name'){
                str+=value[val] + "=";
              } else {
                str+=value[val] + "; ";
              }
            }
        else if(value[val] instanceof Date){
          str += val + "="+ value[val].toUTCString() + "; ";
        } else {
          str += val + "="+ value[val] + "; ";
        }
      }
    //this.values.push(obj);
      //если есть обязательный параметр имя, то добавляем в куки
      console.log("add " + str);
      document.cookie = str.trim();
      this.updateValues();

  }


  //name - имя удаляемой cookie
 delete(name){
    //Удаляет cookie из document.cookie
    //обновляет текущие значения объекта values
    for (let i =0; i<this.values.length; i++){
      if(this.values[i].name.trim() == name){
        let str = this.values[i].name.trim() + "=" + this.values[i].value + "; max-age=0";
        console.log("delete - " + name);
        document.cookie = str;
        this.updateValues();
      }
    }
    

  }


  updateValues(){
    //заполняет объект values парами: имя, значение из document.cookie
    this.values = [];
    let arrOfCookie = document.cookie.split(';');
        for(let i=0; i<arrOfCookie.length; i++){
          let obj= {};
          obj.name = arrOfCookie[i].split("=")[0];
          obj.value = arrOfCookie[i].split("=")[1];
          this.values.push(obj);
        }
  }


  getCookie(name){
    //обновляет текущие значения объекта values
    //возвращает значение cookie c переданным именем
    this.updateValues();
    for(let val=0; val< this.values.length; val++){
      if((this.values[val].name).trim() == name){
        console.log(name + " - " +  this.values[val].value + "; ");
        return this.values[val].value;
      }
    }
  }

}


let cookie=new myCookie;
console.log(cookie.values); //выводит в консоль объект со значениями пар имя значения текущих cookie
cookie.add({name:"user_id",value:"125",maxAge:3600});//создали cookie user_id=125
cookie.add({name:"user_name",value:"Ivan",maxAge:3600});//создали cookie user_name=Ivan
cookie.add({name:"user_email",value:"Ivan@mail.ru",maxAge:3600});//создали cookie user_email=Ivan@mail.ru
console.log(cookie.values); //выводит в консоль объект со значениями пар имя значения текущих cookie
cookie.getCookie("user_id"); //выводит в консоль значение куки user_id
cookie.delete("user_email");//удаляем cookie user_email
console.log(cookie.values); //выводит в консоль объект со значениями пар имя значения текущих cookie