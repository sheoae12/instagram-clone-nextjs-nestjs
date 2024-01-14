import Footer from '../../components/footer/footer';
import LoginBox from '../../components/login/Loginbox';

export default function Login() {
    return (
        <div className='h-full flex flex-col items-center'>
            <div className='mt-70 flex justify-center'>
                {/* <img className='mr-40 w-300 h-600' src='/instagram_mobile.png' /> */}
                <LoginBox />
            </div>
            <Footer />
        </div>
    )
}