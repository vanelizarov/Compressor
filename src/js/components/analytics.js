import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    ORIGINAL,
    LZW_COMP,
    LZW_UNCOMP,
    RLE_COMP,
    RLE_UNCOMP,
    HUFFMAN_COMP,
    HUFFMAN_UNCOMP
} from '../logic/types';

class Analytics extends Component {
    render() {

        if (this.props.frames) {
            if (Object.keys(this.props.frames).length === 7) {

                const {frames} = this.props;

                const tl = frames[ORIGINAL];
                const tm = frames[HUFFMAN_COMP];
                const tr = frames[HUFFMAN_UNCOMP];
                const mm = frames[RLE_COMP];
                const mr = frames[RLE_UNCOMP];
                const bm = frames[LZW_COMP];
                const br = frames[LZW_UNCOMP];

                const rows = [
                    {m: tm, r: tr},
                    {m: mm, r: mr},
                    {m: bm, r: br}
                ];

                const lines = [
                    `M ${tl.right},${tl.top + tl.height / 2} H ${tm.left}`, //tltm
                    `M ${tm.right},${tm.top + tm.height / 2} H ${tr.left}`, //tmtr
                    `M ${tl.right + (tm.left - tl.right) / 2},${tl.top + tl.height / 2} V ${mm.top + mm.height / 2} H ${mm.left}`, //tlmm
                    `M ${mm.right},${mm.top + mm.height / 2} H ${mr.left}`, //mmmr
                    `M ${tl.right + (tm.left - tl.right) / 2},${mm.top + mm.height / 2} V ${bm.top + bm.height / 2} H ${bm.left}`, //tlbm
                    `M ${bm.right},${bm.top + bm.height / 2} H ${br.left}`, //bmbr
                ];

                const {types} = this.props;

                const percents = [
                    (types[HUFFMAN_COMP].size / types[ORIGINAL].size * 100).toFixed(2),
                    (types[RLE_COMP].size / types[ORIGINAL].size * 100).toFixed(2),
                    (types[LZW_COMP].size / types[ORIGINAL].size * 100).toFixed(2)
                ];

                const times = [
                    {comp: types[HUFFMAN_COMP].time, unComp: types[HUFFMAN_UNCOMP].time},
                    {comp: types[RLE_COMP].time, unComp: types[RLE_UNCOMP].time},
                    {comp: types[LZW_COMP].time, unComp: types[LZW_UNCOMP].time}
                ];

                return (
                    <svg className="analytics"
                         xmlns="http://www.w3.org/2000/svg"
                         version="1.1">

                        {
                            lines.map((line, i) => {
                                return (
                                    <path d={line}
                                          className="analytics--line"
                                          key={i}> </path>
                                )
                            })
                        }

                        {
                            rows.map((row, i) => {
                                return (
                                    <text className="analytics--label"
                                          key={i}
                                          x={row.m.left - 4}
                                          y={row.m.top + row.m.height / 2 + 17.5}>
                                        {percents[i]}%
                                    </text>
                                )
                            })
                        }

                        {
                            rows.map((row, i) => {
                                const y = row.m.top + row.m.height / 2 - 7;
                                return (
                                    <g key={i}>
                                        <text className="analytics--label"
                                              x={row.m.left - 4}
                                              y={y}>
                                            {times[i].comp}ms
                                        </text>
                                        <text className="analytics--label"
                                              x={row.r.left - 4}
                                              y={y}>
                                            {times[i].unComp}ms
                                        </text>
                                    </g>
                                )
                            })
                        }

                    </svg>
                );
            }
        }

        return null;

    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        frames: state.exchanges.frames,
        types: state.exchanges.types
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(Analytics);