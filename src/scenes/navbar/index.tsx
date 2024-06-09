import { useContext, useState } from "react";
import logo from "../../assets/logo.jpeg"
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProductContext } from "../../context/productContext";
type Props = {}
const Navbar = (props: Props) => {
    const { cart, setSearchQuery } = useContext(ProductContext);
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setSearchQuery(event.target.value);
    };
    const flexBetween = "flex items-center justify-between"
    return (
        <nav>
            <div className={ `w-full ${flexBetween} fixed top-0 z-30 pt-6 bg-white` }>
                <div className={ `${flexBetween} mx-auto w-5/6 gap-4` }>
                    <img src={ logo } alt="logo" className="w-20 h-20" />
                    <div className={ `${flexBetween} w-full` }>
                        <div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="outline-none border w-[20rem] h-10 rounded-md"
                                value={ query }
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                    <div className={ `${flexBetween} ` }>
                        <p>Cart</p>
                        <button className="relative">
                            <MdOutlineShoppingCart className="w-10 h-10" />
                            <div className="w-5 h-5 rounded-full bg-gray-500 absolute top-0 right-0 text-sm font-bold text-white">{ cart?.length ? cart.length : 0 }</div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar