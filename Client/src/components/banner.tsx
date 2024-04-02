
function Banner() {
  const dummyImageUrl = "https://i.im.ge/2024/04/02/W6IDAp.Screenshot-2024-04-01-174408.png"

    return (
      <> 
        <div className="relative w-full h-64 block-lg overflow-hidden">     
        <img 
            src={dummyImageUrl}
            alt="image"
            className="w-full h-full object-cover transition-opacity duration-300"/>
            <div className="absolute inset-0 bg-black opacity-50 flex item-center justify-center opacity-0 hover:opacity-100 transition-opacity duation-300">
            </div>  
        </div>
      </>
    )
  }
  
  export default Banner
  