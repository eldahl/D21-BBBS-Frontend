import 'react'

function ErrorPage() {

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center text-center'>
            <h1 className='text-xl mb-2'><b>Ops! Something went wrong.</b></h1>
            <p>Please contact the administrator at:</p><a href="mailto:bedbreakfastbookingsystem@gmail.com" target="_blank"><i>bedbreakfastbookingsystem@gmail.com</i></a>
        </div>
    )
}
export default ErrorPage;