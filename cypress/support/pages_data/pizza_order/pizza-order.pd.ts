import { IPageData} from '../page-data'
import * as remove from './pizza-order-delete.apis'
import * as edit from './pizza-order-edit.apis'
import * as view from './pizza-order-view.apis'

class PizzaOrderPageData implements IPageData {
    public name = 'pizza_order'
    public url = '/'
    // User details
    public user_name = '[formcontrolname="name"]'
    public user_email = '[formcontrolname="email"]'
    public user_email_confirm = '[formcontrolname="confirm"]'
    public address = '[formcontrolname="address"]'
    public postcode = '[formcontrolname="postcode"]'
    public phone = '[formcontrolname="phone"]'

    // Pizza toppings
    public toppings_label = 'label.pizza-topping'
    public pepperoni = 'Pepperoni'
    public onion = 'Onion'
    public mozzarella = 'Mozzarella'
    public basil = 'Basil'

    // Order summary
    public total_price = '.pizza-summary__total-price'

    public submit_order_buttom = 'button[type="submit"]'

    public apis = [].concat(
        edit.apis,
        view.apis,
        remove.apis)
}

export { PizzaOrderPageData }
