import { IPageData} from '../page-data'
import * as create from './pizza-order-create.apis'
import * as remove from './pizza-order-delete.apis'
import * as edit from './pizza-order-edit.apis'
import * as view from './pizza-order-view.apis'

class PizzaOrderPageData implements IPageData {
    public name = 'pizza_order'
    public url = '/'
    // User details
    public userName = '[formcontrolname="name"]'
    public userEmail = '[formcontrolname="email"]'
    public userEmailConfirm = '[formcontrolname="confirm"]'
    public address = '[formcontrolname="address"]'
    public postcode = '[formcontrolname="postcode"]'
    public phone = '[formcontrolname="phone"]'

    // Pizza toppings
    public toppingsLabel = 'label.pizza-topping'
    public pepperoni = 'Pepperoni'
    public onion = 'Onion'
    public mozzarella = 'Mozzarella'
    public basil = 'Basil'

    // Order summary
    public totalPrice = '.pizza-summary__total-price'

    public submitOrderButtom = 'button[type="submit"]'

    public apis = [].concat(
        edit.apis,
        view.apis,
        remove.apis,
        create.apis)
}

export { PizzaOrderPageData }
