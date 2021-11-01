.. _exp-slider:

exp-slider
==============================================

Overview
------------------

A frame to collect a participant's input on a slider widget.  Optionally, the frame can operate in a
'feedback' mode where two handles are shown on a non-interactive version of the widget, with the feedback
handle highlighted in red.

What it looks like
~~~~~~~~~~~~~~~~~~

.. image:: /../images/exp-slider-1.png
    :alt: Example screenshot from exp-slider frame

.. image:: /../images/exp-slider-2.png
    :alt: Example screenshot from exp-slider frame in feedback mode

More general functionality
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Below is information specific to this particular frame. There may also be available parameters, events recorded,
and data collected that come from the following more general sources:

- the :ref:`base frame<base frame>` (things all frames do)


Examples
----------------

This frame will collect a participant's response to a question using a horizontal slider widget.

.. code:: javascript

    "slider-frame": {
        "kind": "exp-slider",
                    "title": "Slider title",
                    "labelLeft": "Left",
                    "labelRight": "Right",
                    "feedback": false
        }

This frame will display the participant's response from the previous frame as well as a feedback value.  Here, that
feedback value is hardcoded, but it could also be set within the generateProperties parameter.

.. code:: javascript

    "slider-feedback": {
        "kind": "exp-slider",
                    "title": "Slider title",
                    "labelLeft": "Left",
                    "labelRight": "Right",
                    "feedback": true,
                    "feedbackValue": 75,
                    "generateProperties": "function(expData, sequence, child, pastSessions, conditions){ return {'initialValue': expData[sequence[sequence.length - 1]].sliderResponse} }"
        }

Parameters
----------------

title [String | ``''``]
    Text to display at the top of the frame.  Could prompt the participant for a response or describe the feedback.

labelLeft [String | ``''``]
    Label for the left end of the slider.

labelRight [String | ``''``]
    Label for the right end of the slider.

initialValue [Number | ``50``]
    Initial position of the slider handle.  Possible values range from 0 to 100.

feedback [Boolean | ``false``]
    Whether the frame is in "feedback" mode.  If true, the handle is disabled, and a second red handle is displayed.

feedbackValue [Number | ``0``]
    Position of the feedback handle in feedback mode.  Possible values range from 0 to 100.

Data collected
----------------

The data specifically recorded by this frame are:

:sliderResponse [Number]: Value (0-100) of the slider.

Events recorded
----------------

No events are recorded specifically by this frame.
