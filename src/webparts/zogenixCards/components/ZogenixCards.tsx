import * as React from "react";
import { IZogenixCardsProps } from "./IZogenixCardsProps";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./ZogenixCards.module.scss";

let CharacterLimit;

interface ZogenixCardState {
  ReadMore: boolean;
  ParaText: any;
  ButtonText: any;
  ReadMoreButtonBoolean: boolean;
  Characterlimit: number;
}

export default class ZogenixCards extends React.Component<
  IZogenixCardsProps,
  ZogenixCardState
> {
  constructor(props) {
    super(props);

    this.state = {
      ReadMore: false,
      ParaText: "",
      ButtonText: "ReadMore",
      ReadMoreButtonBoolean: false,
      Characterlimit: parseInt(this.props.CharacterLimit),
    };
    console.log(this.props.DescriptionPara);
  }

  public componentDidMount() {
    if (this.props.DescriptionPara != "") {
      if (this.props.DescriptionPara != undefined) {
        this.Characterlimit();
      }
    }
  }

  public Characterlimit() {
    if (this.state.Characterlimit < this.props.DescriptionPara.length) {
      this.setState({ ReadMore: true });
      this.setState({
        ParaText:
          this.props.DescriptionPara.slice(0, this.state.Characterlimit) +
          "....",
      });
    } else {
      this.setState({
        ParaText: this.props.DescriptionPara.slice(
          0,
          this.props.DescriptionPara.length
        ),
      });
    }
  }

  public ReadMoreButton() {
    if (!this.state.ReadMoreButtonBoolean) {
      this.setState({
        ParaText: this.props.DescriptionPara.slice(
          0,
          this.props.DescriptionPara.length
        ),
      });
      this.setState({ ButtonText: "Show Less" });
      this.setState({ ReadMoreButtonBoolean: true });
    } else {
      this.setState({
        ParaText:
          this.props.DescriptionPara.slice(0, this.state.Characterlimit) +
          "....",
      });
      this.setState({ ButtonText: "Read More" });
      this.setState({ ReadMoreButtonBoolean: false });
    }
  }

  public render(): React.ReactElement<IZogenixCardsProps> {
    return (
      <div className={styles.zogenixCards}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 3000: 1 }}>
          <Masonry>
            <div>
              <div className={styles.news_holder}>
                <div className={styles.card}>
                  <img
                    className={styles.card_image}
                    src={this.props.ImgUrl}
                    alt="news banner"
                  />

                  <div className={styles.card_content}>
                    <div>
                      <a
                        className={styles.Title}
                        href={this.props.RedirectionUrl}
                      >
                        {this.props.Title}
                      </a>
                    </div>
                    <div className={styles.Para}> {this.state.ParaText}</div>{" "}
                    {this.state.ReadMore == true && (
                      <button
                        onClick={this.ReadMoreButton.bind(this)}
                        className={styles.button}
                      >
                        {this.state.ButtonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
  }
}
