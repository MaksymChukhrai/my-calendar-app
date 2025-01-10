import styled from "@emotion/styled";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(90deg, #ffb503, #fc8702);
  color: white;
  height: 48px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  .title-text {
    font-weight: bold;
    font-size: 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  .star-button {
    color: white;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.8;
    }
  }

  .logo-img {
    margin-left: 15px;
  }
`;

export const TeamVisibleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
`;

export const SvgIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`;

export const BadgeBC = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 8px;
`;

export const Title = styled.div`
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: white;
    border-radius: 3px;
    color: #ff6a00;
    font-weight: 500;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
      background: #f0f0f0;
    }
    .points {
      transform: translateY(-3px);
    }
  }

  .calendar-button {
    background: #e28805;
    color: white;
  }
  .share-button {
    background: unset;
    border-radius: 3px;
    color: white;
  }
  .share-button-text {
    text-decoration: underline;
  }
`;
