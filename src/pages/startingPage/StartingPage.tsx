import { CreatingUserPage, RoomPage } from "../index";

function StartingPage() {
  const url = window.location.pathname.split('/')[1]
  console.log(url)
  if (url === "") {
    return <CreatingUserPage />
  }
  return <RoomPage/>

}

export { StartingPage }
