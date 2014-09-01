//����Bar��ID	����DIV��ID	���Bar	�ұ�Bar
var ScrollBar = function(bar_ID, context_ID, barLeft_ID, barReight_ID,moveBy_PX){
    var _bar_obj;//Bar����
    var _barLeft_obj//���ƶ���
    var _barRight_obj;//���ƶ���
    var _context_obj;//���ݶ���
    var _isMoveBar = false;//�Ƿ�Ϊ�϶�Bar
    var _move_max_number;//Bar�ƶ��������ֵ
    var _move_number;//Bar �ƶ�������ֵ 
    var _bar_height;//Bar �Ļ����߶�
    var _context_height;//���ݵĻ����߶�
    var _bar_base_height;//Bar �����߶�
    var _mouse_curr = 0;//��� ���Bar��λ��
    var _bar_curr_top = 0;//�����Bar ��TOp�ľ��� 
    var _move_bar_maxto;//Bar �ƶ������λ�� 
    var _bar_px_number;//Barÿ�����ش��������ֵ
    var _moveByPX=moveBy_PX;//����Ǹ��������ƶ������ƶ���������
    function _init(){
        //��ʼ������
        _bar_obj = $(bar_ID);
        _context_obj = $(context_ID);
        _barLeft_obj = $(barLeft_ID);
        _barRight_obj = $(barReight_ID);
        _context_height = _context_obj.clientHeight;
        _move_number = 0;
        _move_max_number = (_context_obj.scrollHeight / _context_obj.clientHeight) - 1;
        _bar_base_height = _context_obj.clientHeight - _barLeft_obj.clientHeight - _barRight_obj.clientHeight;
        var bar_height_num = _context_obj.clientHeight / _context_obj.scrollHeight;
        //��ʼ��Bar �߶�
        _bar_height = ((bar_height_num >= 1 ? 1 : bar_height_num) * _bar_base_height);
        _bar_obj.style.height = _bar_height + "px";
        _move_bar_maxto = _bar_base_height + (_barLeft_obj.clientHeight - _bar_obj.clientHeight);
        _bar_px_number = 1 / _bar_height;
        
        //�¼���̬ע��
        _addEvent(_bar_obj, "mousedown", _barmousedown);
         _addEvent(document, "mouseup", _changeState);
       // _addEvent(_bar_obj, "mouseout", _changeState);
       // _addEvent(_bar_obj, "mouseover",_changeState);
        _addEvent(document, "mousemove", _movebar);

if(_moveByPX){
  _addEvent(_barLeft_obj,"click",function(){_barMoveByPx(-moveBy_PX)});
          _addEvent(_barRight_obj,"click",function(){_barMoveByPx(moveBy_PX)});	
}else{
  _addEvent(_barLeft_obj, "click", function(){_barMoveByNumber(-0.1)});
          _addEvent(_barRight_obj, "click", function(){_barMoveByNumber(0.1)});	
}

        //var isIE=!!window.ActiveXObject;
        //var isIE6=isIE&&!window.XMLHttpRequest;
        //var isIE8=isIE&&!!document.documentMode;
        //var isIE7=isIE&&!isIE6&&!isIE8;
    };
function _changeState(){
_isMoveBar = false;
} 
//����¼� 
    function _addEvent(obj, evt, fn){
        if (window.attachEvent) {
            obj.attachEvent("on" + evt, fn)
        }
        else {
            obj.addEventListener(evt, fn, false);
        }
    };
//�ƶ� Context���� 
    function _barMoveByContextTop(){
        _move_number = (_bar_obj.offsetTop - _barLeft_obj.clientHeight) * _bar_px_number;
        _context_obj.scrollTop = _context_height * _move_number;
    };
//���� �����ƶ� Bar
    function _barMoveByNumber(num){
        _move_number += num;
        if (_move_number < 0) {
            _move_number = 0;
        }
        if (_move_number > _move_max_number) {
            _move_number = _move_max_number;
        }
        _moveBarTo(_barLeft_obj.clientHeight + (_bar_height * _move_number));
    };
//���� ���� �ƶ�Bar
    function _barMoveByPx(num){
        _moveBarTo(_bar_obj.offsetTop + num);
    };
//���� ID ȡ��Ԫ��
    function $(id){
        return document.getElementById(id);
    };
//��� �ƶ� ���϶�Bar��
    function _movebar(){
        if (_isMoveBar) {
  var event = _mouseCoords(arguments[0] || window.event);
            _moveBarTo(_bar_curr_top + (event.y - _mouse_curr));
        }
    };
//��Bar�ƶ� ��ĳλ�� 
    function _moveBarTo(m_to){
        if (m_to > _barLeft_obj.clientHeight && m_to < _move_bar_maxto) {
            _bar_obj.style.top = m_to+"px";
        }
_barMoveByContextTop();
    };
  //�õ���������
  function _mouseCoords(ev){
   if (ev.pageX || ev.pageY) {
    return {x: ev.pageX,y: ev.pageY};
   }
   return ev;
  }
//�����
    function _barmousedown(){
 var event = _mouseCoords(arguments[0] || window.event);
        _isMoveBar = true;
        _mouse_curr = event.y;
        _bar_curr_top = _bar_obj.offsetTop;
    };
    _init();
};