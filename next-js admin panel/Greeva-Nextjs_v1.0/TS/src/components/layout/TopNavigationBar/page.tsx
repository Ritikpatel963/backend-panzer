import LogoBox from '@/components/LogoBox'
import Notifications from './components/Notifications'
import ThemeCustomizeToggle from '@/components/ThemeCustomizeToggle'
import ProfileDropdown from './components/ProfileDropdown'
import LeftSideBarToggle from './components/LeftSideBarToggle'
import HorizontalToggle from './components/HorizontalToggle'

const TopNavigationBar = () => {
  return (
    <header className="app-topbar">
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <LogoBox />
          <LeftSideBarToggle />
          <HorizontalToggle />
        </div>
        <div className="d-flex align-items-center gap-2">
          <Notifications />
          <ThemeCustomizeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default TopNavigationBar
