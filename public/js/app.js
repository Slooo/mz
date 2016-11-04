function OrderClear(){localStorage.clear(),$(".order-table table tbody").html(""),$(".js-order--type").removeClass("active"),CashierPageLoad()}function OrderUpdate(t){var e=t.parents("tr"),a=e.data("item"),r=t.attr("placeholder");if(0==t.val().length&&(r.length>0?t.val(r):t.val(1)),0==t.val()&&t.val(1),t.parent("td").hasClass("js-order--update-price"))var s=Number(t.val()),o=e.find(".js-order--update-quantity").text();if(t.parent("td").hasClass("js-order--update-quantity"))var s=e.find(".js-order--update-price").text(),o=Number(t.val());var n=OrderItemUpdate(a,s,o);e.find(".js-order--sum").html(n),t.parent("td").html(t.val()),localStorage.setItem("order-table",$(".order-table").html())}function OrderTotalPrice(){var t=JSON.parse(localStorage.getItem("items")),e=t.items.reduce(function(t,e){return t+e.sum},0);$("#order-sum").html(e),t.sum=e,localStorage.setItem("items",JSON.stringify(t))}function OrderItemAdd(t){var e,a;null==localStorage.getItem("items")?(e={},a=[],e.items=a,e.items.push(t),e.sum=t.price*t.quantity,localStorage.setItem("items",JSON.stringify(e))):(e=JSON.parse(localStorage.getItem("items")),e.items.push(t),localStorage.setItem("items",JSON.stringify(e)))}function OrderItemUpdate(t,e,a){var r=JSON.parse(localStorage.getItem("items")),s=Number(e*a);return r.items[t].price=e,r.items[t].quantity=a,r.items[t].sum=s,localStorage.setItem("items",JSON.stringify(r)),OrderTotalPrice(),s}function OrderItemPaste(t){var e,a,r;a=$(".order-table tbody tr").length;for(post in t)e+='<tr data-item="'+a+'">',e+="<td>"+t[post].barcode+"</td>",e+="<td>"+t[post].name+"</td>",e+='<td class="js-order--update js-order--update-price">'+t[post].price+"</td>",e+='<td class="js-order--update js-order--update-quantity">1</td>',e+='<td class="js-order--sum">'+t[post].price+"</td>",e+='<td><button type="button" class="btn btn-xs btn-danger js-order--remove"><i class="fa fa-remove"></i></button></td>',e+="</tr>",r={item:a,id:t[post].id,price:Number(t[post].price),quantity:1,sum:Number(t[post].price)},OrderItemAdd(r);$(".order-table table tbody").append(e),localStorage.setItem("order-table",$(".order-table").html()),CashierPageLoad()}function OrderTypeActive(t){var e=t.siblings();e.each(function(){$(this).removeClass("active")}),t.addClass("active")}function LoaderStart(){$("body").append('<div class="loader"></div>')}function LoaderStop(){$(".loader").remove()}function AnswerSuccess(t){$("#alert").removeClass().addClass("alert alert-success").html(t)}function AnswerError(t){$("#alert").removeClass().addClass("alert alert-danger").html(t)}function AnswerInfo(t){$("#alert").removeClass().addClass("alert alert-info").html(t)}function AnswerWarning(t){$("#alert").removeClass().addClass("alert alert-warning").html(t)}var CashierPageLoad=function(){null==localStorage.getItem("order-table")?($(".order").addClass("hidden"),$("#js-item--search").val("").focus()):(OrderTotalPrice(),OrderTypeActive($(".js-order--type").eq(localStorage["order-type-index"])),$(".order-table").removeClass("hidden").html(localStorage.getItem("order-table")))};$(document).ready(function(){$(function(){$("#datetimepicker, #datetimepicker2").datetimepicker({locale:"ru",format:"DD/MM/YYYY"})}),$("#js-settings--date-range").click(function(t){t.preventDefault();var e,a,r,s,o;e=$("#date_start").val(),a=$("#date_end").val(),r={dateStart:e,dateEnd:a,id:segment3},$.ajax({url:base_url+segment1+segment2+"date",type:"PATCH",dataType:"json",data:r,beforeSend:function(){$(".dropdown").removeClass("open"),LoaderStart()},success:function(t){if($(".col-body h2").remove(),0==t.status&&($(".table").addClass("hidden"),$(".col-footer").addClass("hidden"),$(".col-body").append("<h2>"+t.data+"</h2>")),1==t.status){if(s="",o=JSON.stringify(t.data),r=JSON.parse(o),$(".table").removeClass("hidden"),$(".col-footer").removeClass("hidden"),"costs/"!=segment2){for(row in r)s+="<tr>",s+='<td class="js-url--link" data-url="'+base_url+segment1+segment2+r[row].id+'">'+r[row].id+"</td>",s+="<td>"+r[row].date+"</td>",s+="<td>"+r[row].sum+"</td>",s+="<td>"+r[row].sum_discount+"</td>",s+="<td>"+r[row].type+"</td>",s+="</tr>";$(".totalSumDiscount").html("Итого со скидкой: "+t.extra.totalSumDiscount+" &#8381;")}else for(row in r)s+="<tr>",s+="<td>"+r[row].date+"</td>",s+="<td>"+r[row].sum+"</td>",s+="</tr>";$(".table tbody").html(s),$(".totalSum").html("Итого: "+t.extra.totalSum+" &#8381;")}}}).complete(function(){LoaderStop()})}),$("body").on("click",".js-url--link",function(t){t.preventDefault();var e=$(this).data("url");window.location=e}),$("body").on("click",".js--delete",function(t){t.preventDefault();var e,a,r,s;e=$(this),a=e.parents("tr").data("id"),r=e.parents("tr").data("type"),s={id:a,type:r},""==segment3&&(segment3=a),$.ajax({url:base_url+segment1+segment2+segment3,type:"delete",dataType:"json",data:s,beforeSend:function(){LoaderStart()},success:function(t){0==t.status&&AnswerError("Не удалось выполнить удаление"),1==t.status&&(e.parents("tr").remove(),$("strong").hasClass("totalSumDiscount")&&$(".totalSumDiscount").html("Итого со скидкой: "+t.data.totalSumDiscount+" &#8381;"),$(".totalSum").html("Итого: "+t.data.totalSum+" &#8381;"),AnswerInfo("Удалено")),"redirect"==t.status&&(window.location.href=base_url+segment1+segment2)},error:function(t){AnswerError("Ошибка запроса")}}).complete(function(){LoaderStop()})}),$(".js--update").on("click",function(){var t,e,a;t=$(this),e=t.text().replace(/\s+/g,""),a=t.data("type"),t.html('<input type="text" data-type="'+a+'" value="'+e+'">'),t.attr("id","js--update"),t.find("input").numeric().focus()}),$(document).on("focusout","td#js--update input",function(){var t,e,a,r,s;t=$(this),e=t.parents("tr").data("id"),a=t.val().replace(/\s+/g,""),r=t.data("type"),s={id:e,col:r,val:a},a.length>0&&$.ajax({url:base_url+segment1+segment2+segment3,type:"patch",dataType:"json",data:s,beforeSend:function(){LoaderStart()},success:function(e){0==e.status&&AnswerError(e.message),1==e.status&&($(".totalSumDiscount").html("Итого со скидкой: "+e.data.totalSumDiscount+" &#8381;"),$(".totalSum").html("Итого: "+e.data.totalSum+" &#8381;"),t.parents("tr").find(".sum").text(e.data.sum),t.parent("td").removeAttr("id").text(e.data.value),AnswerSuccess(e.message))},error:function(t){AnswerError("Ошибка запроса")}}).complete(function(){LoaderStop()})}),$(".js-item--update").on("click",function(){var t=$(this),e=t.text(),a=t.data("type");t.html('<input type="text" data-type="'+a+'" value="'+e+'">'),t.attr("id","js-item--update"),t.find("input").numeric().focus()}),$(document).on("focusout","td#js-item--update input",function(){var t=$(this),e=t.parents("tr").attr("item"),a=t.val(),r=t.data("type"),s={};s[r]=a,$.ajax({url:"items/"+e,type:"PATCH",dataType:"json",data:s,beforeSend:function(){LoaderStart()},success:function(e){0==e.status&&AnswerError(e.message),1==e.status&&(t.parent("td").removeAttr("id").html(a),AnswerSuccess(e.message))}}).complete(function(){LoaderStop()})}),$("body").on("click",".js-item--status",function(t){t.preventDefault();var e=$(this),a=e.attr("data-status"),r=e.attr("data-id"),s={id:r,status:a};$.ajax({url:"items/status",type:"PATCH",dataType:"json",data:s,beforeSend:function(){LoaderStart()},success:function(t){0==t.status&&(e.removeClass("btn-success").addClass("btn-danger"),e.html('<i class="fa fa-ban"></i>'),e.attr("data-status",t.status)),1==t.status&&(e.removeClass("btn-danger").addClass("btn-success"),e.html('<i class="fa fa-check"></i>'),e.attr("data-status",t.status))}}).complete(function(){LoaderStop()})}),$("#js-item--barcode").focusout(function(){var t=$(this).val(),e={barcode:t};t&&$.ajax({url:base_url+segment1+"items/search",type:"PATCH",dataType:"json",data:e,beforeSend:function(){LoaderStart()},success:function(t){if(0==t.status&&($("#item_id, #name, #price, #quantity").val(""),$("#js-item--sbm").text("Создать"),AnswerInfo("<strong>"+t.message+"</strong>. Будет создан новый")),1==t.status){var e=JSON.stringify(t.items),a=JSON.parse(e);$("#item_id").val(a.id),$("#name").val(a.name),$("#price").val(a.price),$("#quantity").val(a.quantity),$("#js-item--sbm").text("Обновить"),AnswerWarning("<strong>"+t.message+"</strong>. Будет обновлен")}}}).complete(function(){LoaderStop()})}),$("body").on("click","#js-item--sbm",function(t){t.preventDefault();var e=$("#form_item").serialize(),a=$("#item_id").val();0==a?(url=base_url+segment1+segment2,type="POST"):(url=a,type="PATCH"),$.ajax({url:url,type:type,dataType:"json",data:e,beforeSend:function(){LoaderStart()},success:function(t){0==t.status&&AnswerError("<strong>"+t.message+"</strong>"),1==t.status&&AnswerInfo("<strong>"+t.message+"</strong>")},error:function(t){AnswerError("<strong>Ошибка!</strong> Заполните поля")}}).complete(function(){LoaderStop()})}),$("body").on("click",".js-item--print-review",function(t){t.preventDefault();var e=$(this).data("barcode");$("#print-modal strong").html(e),$("#js-item--print-review").val(e),$("#print-modal").modal("show")}),$("#print-modal").on("shown.bs.modal",function(){$("#print-quantity").numeric({decimal:!1,negative:!1}).focus()}),$("#print-quantity").keyup(function(){"0"==$(this).val()&&$(this).val(1)}),$("#js-item--print-cancel").click(function(t){$(".full").addClass("hidden"),$(".row").removeClass("hidden"),$("#print-modal").modal("hide")}),$("#js-item--print-review").click(function(t){$("#print-modal").modal("hide"),$(".row").addClass("hidden");var e="",a=$("#js-item--print-review").val(),r=$("#print-quantity").val(),s={barcode:a};$.ajax({url:base_url+segment1+"items/barcode/generate",type:"PATCH",dataType:"json",data:s,beforeSend:function(){LoaderStart()},success:function(t){if(1==t.status){var a=JSON.stringify(t.item),s=JSON.parse(a);for(i=0;i<r;i++)e+='<div class="box">',e+='<div class="header">ИП Зибарева С.С.</div>',e+='<div class="description"><span>'+s.barcode+"</span><time>"+t.time+"</time></div>",e+='<div class="title">'+s.name+"</div>",e+='<div class="barcode">'+t.barcode+"<br>",e+="<span>"+s.barcode+"</span></div>",e+='<div class="footer"><p>'+s.price+"</p>",e+="<span>руб. за шт.</span>",e+="</div></div>";$(".full").removeClass("hidden"),$(".print").html(e)}},error:function(t){AnswerError("Укажите тип оплаты")}}).complete(function(){LoaderStop()})}),$("body").on("click","#js-print",function(t){t.preventDefault(),window.print()}),$("body").on("click",".js-order--type",function(t){var e=$(this),a=Number(e.val());localStorage&&(localStorage["order-type-index"]=$(this).index());var r=JSON.parse(localStorage.getItem("items"));r.type=a,localStorage.setItem("items",JSON.stringify(r)),OrderTypeActive(e)}),$("#js-item--search").keyup(function(t){t.preventDefault();var e=$(this).val(),a={barcode:e};e.length>10&&$.ajax({url:base_url+segment1+"items/search",type:"PATCH",dataType:"json",data:a,beforeSend:function(){LoaderStart()},success:function(t){if(0==t.status&&AnswerError('<button id="js-item--barcode-create" class="btn btn-danger">Отправить штрихкод</button>'),1==t.status){$(".order").removeClass("hidden"),$("#alert").removeClass().html("");var e=JSON.stringify(t.items),a=JSON.parse(e);OrderItemPaste(a)}},error:function(t){AnswerError("Введите штрихкод")}}).complete(function(){LoaderStop()})}),$(document).on("click",".js-order--update",function(){var t=$(this),e=t.text();t.html('<input type="text" id="js-order--update" placeholder="'+e+'">'),$("#js-order--update").numeric(),t.find("input").focus()}),$(document).on("keypress","#js-order--update",function(t){13==t.which&&OrderUpdate($(this))}),$(document).on("focusout","#js-order--update",function(){OrderUpdate($(this))}),$("body").on("click",".js-order--remove",function(){var t=$(this).parents("tr"),e=t.data("item"),a=(t.find(".js-order--price").val(),t.find(".js-order--quantity").val(),$(".order-table tbody tr").length),r=JSON.parse(localStorage.getItem("items")),s=r.items.findIndex(function(t,a){return t.item===e});r.items.splice(s,1),localStorage.setItem("items",JSON.stringify(r)),t.remove(),1==a?OrderClear():(localStorage.setItem("order-table",$(".order-table").html()),OrderTotalPrice())}),$("body").on("click","#js-item--barcode-create",function(t){t.preventDefault();var e=$("#item-search").val(),a={barcode:e};$.ajax({url:"cashier/barcode",type:"POST",dataType:"json",data:a,beforeSend:function(){LoaderStart()},success:function(t){0==t.status&&AnswerError(t.message),1==t.status&&AnswerSuccess(t.message)},error:function(t){AnswerSuccess("Ошибка")}}).complete(function(){LoaderStop()})}),$("body").on("click","#js-order-and-supply--create",function(t){t.preventDefault();var e,a,r,s,o;e=JSON.parse(localStorage.getItem("items")),a=e.sum,r=e.type,s=JSON.stringify(e.items),o={sum:a,type:r,items:s},url=segment2.substring(0,segment2.length-1),"supply"!=url&&(url="orders"),$.ajax({url:base_url+segment1+url,type:"POST",dataType:"json",data:o,beforeSend:function(){LoaderStart()},success:function(t){1==t.status&&(OrderClear(),AnswerSuccess('<strong><a href="'+base_url+segment1+url+"/"+t.message+'">Успешно создано</a></strong>'))},error:function(t){AnswerError("Укажите тип оплаты")}}).complete(function(){LoaderStop()})}),$("body").on("click","#js-costs--create",function(t){t.preventDefault();var e=$("#form_costs").serialize();$.ajax({url:base_url+"costs",type:"POST",dataType:"json",data:e,beforeSend:function(){LoaderStart()},success:function(t){1==t.status&&AnswerSuccess(t.message)},error:function(t){AnswerError("Заполните все поля")}}).complete(function(){LoaderStop(),$("#price").val("")})}),$.ajaxSetup({headers:{"X-CSRF-Token":$('meta[name="_token"]').attr("content")}})});