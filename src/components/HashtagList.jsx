import React from "react";
import "../styles/HashtagList.css";
import FlipMove from "react-flip-move";

class HashtagList extends React.Component {
    render() {
        const hashtags = this.props.hashtags;
        const listHashtags = hashtags.map((hash) => (
            <div className="listHash">
                <p key={hash.key}>
                    <input type="text" value={hash.hashtag} key={hash.key} />

                    <span
                        className="faicons"
                        onClick={() => {
                            this.props.deleteHash(hash.key);
                        }}
                    >
                        <i className="far fa-trash-alt"></i>
                    </span>
                </p>
            </div>
        ));

        return (
            <div>
                <FlipMove duration={300} easing="ease-in-out">
                    {listHashtags}
                </FlipMove>
            </div>
        );
    }
}
export default HashtagList;
