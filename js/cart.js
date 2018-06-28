var cart = {};

$.getJSON('goods.json', function(data){
    var goods = data;//товары в массиве
    checkCart();
    showCart();

    function showCart() {
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину <a href="/b-shop.com"> Барахолка.</a>';
            $('#my-cart').html(out);
        } else {
            var out = '';
            for (var key in cart) {
                out += '<button class="delete" data-art="' + key + '">x</button>';
                out += '<img src="' + goods[key].image + '"width="48">';
                out += goods[key].name;
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += cart[key];
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += cart[key] * goods[key].cost;
                out += '<br>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }

    function plusGoods(){
        var article = $(this).attr('data-art');
        cart[article]++;
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function minusGoods(){
        var article = $(this).attr('data-art');
        if (cart[article] > 1) cart[article]--;
        else delete cart[article];
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }

    function deleteGoods(){
        var article = $(this).attr('data-art');
        delete cart[article];
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }
});

function checkCart(){
    //проверяю наличие корзины в localStorage
    if (localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}