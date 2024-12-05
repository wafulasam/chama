import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AboutPage } from '../pages';

export default function MainRouter () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/about' element={<AboutPage/>} />
                <Route path="*" element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
    )
}