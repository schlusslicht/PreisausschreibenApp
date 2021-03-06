import React from 'react';

export default function withCommentContainer( WrappedComponent ) {
    return (
        class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    visible: false
                }
                this.showDrawer = this.showDrawer.bind(this);
                this.onClose = this.onClose.bind(this);
            }

            showDrawer() {
                this.setState( { visible: true} );
            }

            onClose() {
                this.setState( {visible: false} );
            }

            render() {
                const { hocProp, ...passthroughProps } = this.props;
                const comments = this.props.comments;

                return( <div>
                    <WrappedComponent comments={comments} showDrawer={this.showDrawer} onClose={this.onClose} visible={this.state.visible} {...passthroughProps} />
                </div> );
            }
        }
    );
}