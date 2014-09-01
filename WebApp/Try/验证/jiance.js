//���õ�������ʽ����������չ
var matchExp = new Array();
//matchExp["int"]="^([+-]?)\\d+$";
matchExp["int"]="^([+-]?)\\d{1,9}$";
matchExp["int+"]="^([+]?)\\d+$";
matchExp["int-"]="^-\\d+$";
matchExp["num"]="^([+-]?)\\d*\\.?\\d+$";
matchExp["num+"]="^([+]?)\\d*\\.?\\d+$";
matchExp["num-"]="^-\\d*\\.?\\d+$";
matchExp["float"]="^([+-]?)\\d*\\.\\d+$";
matchExp["float+"]="^([+]?)\\d*\\.\\d+$";
matchExp["float-"]="^-\\d*\\.\\d+$";
matchExp["email"]="^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
matchExp["color"]="^#[a-fA-F0-9]{6}";
matchExp["url"]="^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$";
matchExp["chinese"]="^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]{1,9}$";
matchExp["ascii"]="^[\\x00-\\xFF]+$";
matchExp["zipcode"]="^\\d{6}$";
matchExp["mobile"]="^0{0,1}13[0-9]{9}$";
matchExp["ip4"]="^\(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))$";
matchExp["notempty"]="^[^ ]+$";
matchExp["picture"]="(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$";
matchExp["rar"]="(.*)\\.(rar|zip|7zip|tgz)$";
matchExp["date"]="^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$";
//ȱʡ��Ϣ
var matchMessage =	{
	"int"	:"����������",											//����
	"int+"	:"������������",										//������
	"int-"	:"�����븺����",										//������
	"num"	:"����������",											//����
	"num+"	:"����������",											//����
	"num-"	:"�����븺����",										//����
	"float"	:"�����븡����",										//������
	"float+":"��������������",										//��������
	"float-":"�����븺������",										//��������
	"email"	:"��������ȷ�������ַ",								//�ʼ�
	"color"	:"��������ȷ����ɫ",									//��ɫ
	"url"	:"��������ȷ�����ӵ�ַ",								//����
	"chinese":"����������",											//����
	"ascii"	:"������ascii�ַ�",										//��ACSII�ַ�
	"zipcode":"��������ȷ����������",								//�ʱ�
	"mobile":"��������ȷ���ֻ�����",								//�ֻ�
	"ip4"	:"��������ȷ��IP��ַ",									//ip��ַ
	"notempty":"�����пո�",										//�ǿ�
	"picture":"��ѡ��ͼƬ",											//ͼƬ
	"rar"	:"������ѹ���ļ�",										//ѹ���ļ�
	"date"	:"��������ȷ������"										//����
}

//���ݸ�ʽ��֤��
var FormValidator =
{
    //����Ƿ�Ϊ��
    CheckEmpty: function (element, message) {
        if (!element.type) {
            //�Ƿ�Ԫ��
            alert("CheckEmpty:����ʹ���˷Ƿ�Ԫ��");
            return;
        }
        //ʧȥ�������֤Ԫ��
        element.onblur = function () {
            return FormValidator.IsEmpty(this, message)
        }
    },

    //��鳣�ø�ʽ
    Match: function (element, matchName, message) {
        if (!element.type) {
            //�Ƿ�Ԫ��
            alert("CheckEmpty:����ʹ���˷Ƿ�Ԫ��");
            return;
        }
        //ʧȥ�������֤Ԫ��
        element.onblur = function () {
            if (!message) {
                message = matchMessage[matchName];
            }
            return FormValidator.IsMatch(this, matchExp[matchName], message);
        }
    },


    //����Զ����ʽ
    MacthRegExp: function (element, regExp, message) {
        if (!element.type) {
            //�Ƿ�Ԫ��
            alert("CheckEmpty:����ʹ���˷Ƿ�Ԫ��");
            return;
        }
        //ʧȥ�������֤Ԫ��
        element.onblur = function () {
            return FormValidator.IsMatch(this, regExp, message);
        }
    },

    //����Ϊ�գ�Ҳ���ܸ�ʽ����
    CheckEmptyAndMatch: function (element, regExp, emptyMessage, errorMessage) {
        if (!element.type) {
            //�Ƿ�Ԫ��
            alert("CheckEmpty:����ʹ���˷Ƿ�Ԫ��");
            return;
        }
        //ʧȥ�������֤Ԫ��
        element.onblur = function () {
            if (!FormValidator.IsEmpty(this, emptyMessage)) {
                return FormValidator.IsMatch(this, regExp, errorMessage);
            } else {
                return false;
            }
        }
    },

    //�Ƚ�������ֵ
    Compare: function (original, element, message) {
        if (!element.type || !original.type) {
            //�Ƿ�Ԫ��
            alert("Compare:����ʹ���˷Ƿ�Ԫ��");
            return;
        }
        //ʧȥ�������֤Ԫ��
        element.onblur = function () {
            return FormValidator.IsEqual(original, this, message);
        }
    },

    //����Ƿ�Ϊ��
    IsEmpty: function (element, message) {
        if (element.value.trim() == "") {
            FormValidator.Invalid(element, message);
            return true;
        } else {
            FormValidator.Valid(element);
            return false;
        }
    },

    //����ʽ�Ƿ�Ϊ��ȷ
    IsMatch: function (element, regExp, message) {
        //��Ϊ��ֵ�����м��
        if (element.value.trim() == "") {
            FormValidator.Valid(element);
            return true;
        }
        try {
            var reg = new RegExp(regExp, "i");
            if (!reg.test(element.value.trim())) {
                FormValidator.Invalid(element, message);
                return false;
            } else {
                FormValidator.Valid(element);
                return true;
            }
        } catch (error) {
            //�Ƿ����ø�ʽ
            alert("regExp:�Ƿ����ʽ");
            return false;
        }
    },

    //�Ƚ�������ֵ�Ƿ�һ��
    IsEqual: function (original, element, message) {
        //��ûָ�����������ʾ����
        if (!original) {
            alert("Compare:δָ���Ƚ϶���");
            return false;
        }
        if (element.value.trim() == original.value.trim()) {
            FormValidator.Valid(element);
            return true;
        } else {
            FormValidator.Invalid(element, message);
            return false;
        }
    },

    //�ؼ���ʽ��Ч
    Invalid: function (element, message) {
        //����ԭ������ʽ
        if (element.getAttribute("OldClassName") == null) {
            element.setAttribute("OldClassName", element.className);
        }
        //�������ʾ��Ч״̬
        element.className = "InvalidInput";

        //��ʾ��ʾ����
        var invalidMsg = document.getElementById(element.id + "_InvalidMsg");
        if (invalidMsg) {
            invalidMsg.style.display = "";
            invalidMsg.innerHTML = message;
        } else {
            invalidMsg = document.createElement("SPAN");
            element.parentNode.appendChild(invalidMsg);
            invalidMsg.id = element.id + "_InvalidMsg";
            invalidMsg.className = "InvalidInputMsg";
            invalidMsg.innerHTML = message;
        }
    },

    //�ؼ���ʽ��Ч
    Valid: function (element) {
        if (element.getAttribute("OldClassName") != null) {
            //�ָ�ԭ������ʽ
            element.className = element.getAttribute("OldClassName");
            var invalidMsg = document.getElementById(element.id + "_InvalidMsg");
            if (invalidMsg) {
                invalidMsg.style.display = "none";
            }
        }

    },

    //����
    CheckForm: function (form) {
        form.IsValid = true;
        var elements = form.getElementsByTagName("INPUT");
        //ѭ������
        for (i = 0; i < elements.length; i++) {
            var elem = elements[i];
            var noEmpty = elem.getAttribute("NotEmpty");
            var matchName = elem.getAttribute("Match");
            var regExp = elem.getAttribute("RegExp");
            var compare = elem.getAttribute("Compare");
            //���ȼ���ֵ���и�ʽ����֤
            if (noEmpty == "true" && matchName) {
                //���ܿգ�����ƥ���ʽ
                if (!FormValidator.IsEmpty(elem, elem.getAttribute("EmptyMessage"))) {
                    var errmsg = elem.getAttribute("ErrorMessage");
                    if (!errmsg) {
                        errmsg = matchMessage[matchName];
                    }
                    if (!FormValidator.IsMatch(elem, matchExp[matchName], errmsg)) {
                        //��֤��ʽ�Ƿ�
                        form.IsValid = false;
                    }
                } else {
                    //��֤�ǿ�ֵ
                    form.IsValid = false;
                }
            }
            //���ȼ���ֵ���и�ʽ����֤
            else if (noEmpty == "true" && regExp) {
                //���ܿգ�����ƥ���ʽ
                if (!FormValidator.IsEmpty(elem, elem.getAttribute("EmptyMessage"))) {
                    if (!FormValidator.IsMatch(elem, regExp, elem.getAttribute("ErrorMessage"))) {
                        //��֤��ʽ�Ƿ�
                        form.IsValid = false;
                    }
                } else {
                    //��֤�ǿ�ֵ
                    form.IsValid = false;
                }
            }
            //��֤��ֵ
            else if (noEmpty == "true") {

                if (FormValidator.IsEmpty(elem, elem.getAttribute("EmptyMessage"))) {
                    //��֤�ǿ�ֵ
                    form.IsValid = false;
                }
            }
            //��֤���ø�ʽ
            else if (matchName) {
                var errmsg = elem.getAttribute("ErrorMessage");
                if (!errmsg) {
                    errmsg = matchMessage[matchName];
                }
                if (!FormValidator.IsMatch(elem, matchExp[matchName], errmsg)) {
                    //��֤��ʽ�Ƿ�
                    form.IsValid = false;
                }
            }
            //��֤�Զ����ʽ
            else if (regExp) {
                if (!FormValidator.IsMatch(elem, regExp, elem.getAttribute("ErrorMessage"))) {
                    //��֤��ʽ�Ƿ�
                    form.IsValid = false;
                }
            }
            //��֤�����Ƿ�һ��
            else if (compare) {
                if (!FormValidator.IsEqual(document.getElementById(compare), elem, elem.getAttribute("ErrorMessage"))) {
                    //��֤�����벻һ��
                    form.IsValid = false;
                }
            }
        }
        return form.IsValid;
    }

}


//��չString�ķ�����trim
String.prototype.trim = function String$trim() {
    if (arguments.length !== 0) {alert("String.trim:��������");return;};
    return this.replace(/^\s+|\s+$/g, '');
}



//��ʼ��
function InitForm(){
	for(var f=0; f<document.forms.length; f++){
		var form = document.forms[f];
		//��ʼ����Ҫ��֤���ݵı�Ԫ��
		if(form.getAttribute("UseValidator") == "true"){
			var elements = form.getElementsByTagName("INPUT");
			//ѭ������
			for(i=0; i<elements.length; i++){
				var elem = elements[i];
				var noEmpty = elem.getAttribute("NotEmpty");
				var matchName = elem.getAttribute("Match");
				var regExp = elem.getAttribute("RegExp");
				var compare = elem.getAttribute("Compare");
				//���ȼ���ֵ���и�ʽ����֤
				if(noEmpty == "true" && matchName){
					var errmsg = elem.getAttribute("ErrorMessage");
					if(!errmsg){
						errmsg = matchMessage[matchName];
					}
					FormValidator.CheckEmptyAndMatch(elem, matchExp[matchName], elem.getAttribute("EmptyMessage"), elem.getAttribute("ErrorMessage"));
				}
				//���ȼ���ֵ���и�ʽ����֤
				else if(noEmpty == "true" && regExp){
					FormValidator.CheckEmptyAndMatch(elem, regExp, elem.getAttribute("EmptyMessage"), elem.getAttribute("ErrorMessage"));
				}
				//��֤��ֵ
				else if(noEmpty == "true"){
					FormValidator.CheckEmpty(elem, elem.getAttribute("EmptyMessage"));
				}
				//��֤���ø�ʽ
				else if(matchName){
					FormValidator.Match(elem, matchName, elem.getAttribute("ErrorMessage"));
				}
				//��֤�Զ����ʽ
				else if(regExp){
					FormValidator.MacthRegExp(elem, regExp, elem.getAttribute("ErrorMessage"));
				}
				//��֤�����Ƿ�һ��
				else if(compare){
					FormValidator.Compare(document.getElementById(compare), elem, elem.getAttribute("ErrorMessage"));
				}
				
			}
		}
	}
}	

//��ʼ����
InitForm();

