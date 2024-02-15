// import React from 'react';
// import { Col, Table } from 'react-bootstrap';
// import MinedBlockRow from './MinedBlockRow'; // Import MinedBlockRow component if not already done

// const LatestBlocks = ({ latestBlocks }) => {
//   return (
//     <Col lg={6} className="mb-4">
//       <div className="card">
//         <div className="card-header">
//           <h6 className="card-header-title mb-0">Latest Blocks</h6>
//         </div>
//         <div className="card-body overflow-auto scrollbar-custom" style={{ maxHeight: '30.3rem' }}>
//           {latestBlocks.map((block, index) => (
//             <React.Fragment key={index}>
//               <div className="row">
//                 <div className="col-sm-4">
//                   <div className="d-flex align-items-center gap-2">
//                     <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{ height: '3rem', width: '3rem' }}>
//                       <i className="fa-solid fa-cube"></i>
//                     </div>
//                     <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
//                       <span className="d-inline-block d-sm-none">Block</span>
//                       <a className="text-truncate" style={{ maxWidth: '6rem' }} href="#">
//                         {block.blockIndex}
//                       </a>
//                       <div className="small text-muted">
//                         {block.minedAt} ago
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
//                   {/* Add block-specific data from the 'block' object */}
//                   <div className="pe-0 pe-sm-2">
//                     <div className="d-flex flex-wrap gap-1">
//                       Validated By{' '}
//                       <a href={block.validatedByLink} data-bs-toggle="tooltip">
//                         {block.validatedBy}
//                       </a>
//                     </div>
//                     <a href="#" data-bs-toggle="tooltip">
//                       {block.numTransactions} txns
//                     </a>
//                     <span className="small text-muted me-2">
//                       in {block.timeElapsed} secs
//                     </span>
//                     <span className="d-inline-block d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2" data-bs-toggle="tooltip">
//                       {block.coins} SOLX
//                     </span>
//                   </div>
//                   <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
//                     <span className="badge border dark:border-white border-opacity-15 text-dark fw-normal py-1.5 px-2" data-bs-toggle="tooltip">
//                       {block.coins} SOLX
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <hr />
//             </React.Fragment>
//           ))}
//         </div>
//         <a className="card-footer bg-light fw-medium text-cap link-muted text-center" href="/blocks">
//           View all blocks <i className="fa-solid fa-arrow-right"></i>
//         </a>
//       </div>
//     </Col>
//   );
// };

// export default LatestBlocks;
