import body from "./assets/meow-body.png"
import tail from "./assets/meow-tail.png"
import "./Cat.css"
export default function(){
  return (
    <section className="cat">
      <img src={body} className="cat-body"/>
      <img src={tail} className="cat-tail"/>
    </section>
  )
}