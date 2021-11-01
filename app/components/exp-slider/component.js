import ExpFrameBaseComponent from '../exp-frame-base/component';
import layout from './template';

/**
 * A frame to collect a participant's response to a question using a horizontal slider widget.  By default,
 * the frame is used to collect a response, but in "feedback" mode, the slider is not rendered with two fixed
 * handles, one of which is colored red.  This is intended to be used to display the participant's response
 * together with the "correct" response.
 *
 ```
{
    "frames": {
        "slider-frame": {
        "kind": "exp-slider",
                    "title": "Slider title",
                    "labelLeft": "Left",
                    "labelRight": "Right",
                    "feedback": false
        },
	"slider-feedback": {
        "kind": "exp-slider",
                    "title": "Slider title",
                    "labelLeft": "Left",
                    "labelRight": "Right",
                    "feedback": true,
                    "feedbackValue": 75,
                    "generateProperties": "function(expData, sequence, child, pastSessions, conditions){ return {'initialValue': expData[sequence[sequence.length - 1]].sliderResponse} }"
        }
    },
    "sequence": [
        "slider-frame",
        "slider-feedback"
    ]
}
 ```
 * @class Exp-slider
 * @extends Exp-frame-base
 */

export default ExpFrameBaseComponent.extend({ //list any mixins here before the {
    type: 'exp-slider',
    layout: layout,

    frameSchemaProperties: {
        /**
         * Title text for the slider.
         *
         * @property {String} title
         * @default false
         */
        title: {
            type: 'string',
            default: '',
            description: 'Title text for the slider.'
        },

        /**
         * Slider left label.
         *
         * @property {String} labelLeft
         * @default ''
         */
        labelLeft: {
            type: 'string',
            default: '',
            description: 'Label for the left end of the slider.'
        },

        /**
         * Slider right label.
         *
         * @property {String} labelRight
         * @default ''
         */
        labelRight: {
            type: 'string',
            default: '',
            description: 'Label for the right end of the slider.'
        },

        /**
         * Initial value for the slider.
         *
         * @property {number} initialValue
         * @default 50
         */
        initialValue: {
            type: 'number',
            default: 50,
            description: 'Initial value of the slider'
        },

        /**
         * Is this a feedback slide?
         *
         * @property {Boolean} feedback
         * @default false
         */
        feedback: {
            type: 'boolean',
            default: false,
            description: 'Is this a feedback slide?'
        },

        /**
         * Feedback value.
         *
         * @property {Number} feedbackValue
         * @default ''
         */
        feedbackValue: {
            type: 'number',
            default: 0,
            description: 'Value for position of feedback.'
        }
    },

    frameSchemaRequired: ['title', 'labelLeft', 'labelRight', 'initialValue', 'feedback'],

    sliderResponse: null,

    meta: {
        name: 'ExpSlider',
        description: 'Slider with optional feedback',
        data: {
            type: 'object',
            properties: {
                // define data to be sent to the server here.

                /**
                 * Slider Response
                 *
                 * @attribute sliderResponse
                 * @type number
                 */
                sliderResponse: {
                    type: 'number',
                    default: 0
                }
            }
        }
    },
    actions: {
        // Define any actions that you need to be able to trigger from within the template here
    },

    didInsertElement() {
        this._super(...arguments);

        let slider_widget = this.$('.exp-slider-widget');
        let _this = this;

        slider_widget.slider({
            min: 0,
            max: 100,
            values: ((this.feedback) ? [this.initialValue, this.feedbackValue] : [this.initialValue]),
            disabled: this.feedback,  // disable slider for feedback slides
            change: function(event, ui){
                console.log('Slider change event');
                console.log(ui.value);
                _this.set("sliderResponse", ui.value);
            }
        });

        if(this.feedback){
            // Remove appearance of being disabled while leaving widget disabled.
            slider_widget.removeClass('ui-state-disabled');

            // Style the feedback handle
            let feedback_handle = slider_widget.children('.ui-slider-handle')[1];
            this.$(feedback_handle).css('background', 'red');

        } else {
            // set the sliderResponse to the initial value
            _this.set('sliderResponse', this.initialValue);
        }
    }
});
