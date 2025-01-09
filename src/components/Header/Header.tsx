import { 
    HeaderWrapper, 
    LeftSection, 
    Logo, 
    BadgeBC, 
    // Title, 
    Actions,
    TeamVisibleSection,
    SvgIcon 
  } from './Header.styles';
  
  const Header = () => {
    return (
      <HeaderWrapper>
        <LeftSection>
            <span className="title-text">TeamSync Calendar</span>
          <Logo>
            <button className="star-button">
              <SvgIcon>
                <use href="/sprite.svg#icon-star" />
              </SvgIcon>
            </button>
            <img className="logo-img" src="/airplane-icon.png" alt="Airplane Icon" />
            <span>Travidux, LLC</span>
            <BadgeBC>BC</BadgeBC>
          </Logo>
          <TeamVisibleSection>
            <SvgIcon>
              <use href="/sprite.svg#icon-team" />
            </SvgIcon>
           <span>Team Visible</span> 
            <SvgIcon>
              <use href="/sprite.svg#icon-lock" />
            </SvgIcon>
          </TeamVisibleSection>
        </LeftSection>
        
        {/* <Title>March 2018</Title> */}
        
        <Actions>
          <button className="calendar-button">
            <SvgIcon>
              <use href="/sprite.svg#icon-calendar" />
            </SvgIcon>
            <span className="share-button-text">Calendar</span>
          </button>
          <button className="share-button">
            <span className="points">...</span>
            {/* <SvgIcon>
              <use href="/sprite.svg#icon-share" />
            </SvgIcon> */}
            <span className="share-button-text">Share</span>
          </button>
        </Actions>
      </HeaderWrapper>
    );
  };
  
  export default Header;