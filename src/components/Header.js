const Header = ({slogan, storeName}) => {
    return (
      <div>
          <h1>{storeName}</h1>
          <h2>Don't forget to {slogan}</h2>
      </div>
    )
  }
  
  export default Header