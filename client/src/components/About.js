import React, {useContext} from 'react'

import { ThemeContext } from '../context/ThemeContext'

const About = () => {
    const {theme,setTheme} = useContext(ThemeContext)
  return (
    <section className={theme.bg ==='dark' ? 'bg-dark text-light about':'about '}>
<h2>About</h2>

<div className='about-body'></div>
My record album is a low profile app that allows users me to post music that I like. I hope that anyone coming to check out
my record collection makes a contribution and posts a song or record that means something to them.



    </section>
  )
}

export default About