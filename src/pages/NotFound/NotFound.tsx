import "./NotFound.css"

export default function NotFound() {
  return (
    <div className='centerd notfound'>
      <div className='flexer content'>
        <h1 className="font-ExtraBold">404</h1>
        <div className="spacer" />
        <div className="divider" />
        <div className="spacer" />
        <div>
          <h4>Page Not Found</h4>
          <p>This page doesn't exist or was removed!</p>
        </div>
      </div>
    </div>
  )
}
