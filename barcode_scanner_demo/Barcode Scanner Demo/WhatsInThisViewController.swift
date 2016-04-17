//
//  WhatsInThisViewController.swift
//  Barcode Scanner Demo
//
//  Created by Michael Law on 2016-04-16.
//  Copyright © 2016 Bowst. All rights reserved.
//

import UIKit

class WhatsInThisViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    @IBOutlet weak var productCodeLabel: UILabel!
    
    var productCode:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        print("Loading WhatsInThisViewController with " + productCode)

        productCodeLabel.text = productCode
//        let urlString = "https://ancient-springs-86295.herokuapp.com/" + productCode
        let urlString = "http://52.86.216.169:3000/" + productCode
        print("my url string" + urlString)
        let url = NSURL (string: urlString)
        let requestObj = NSURLRequest(URL: url!);
        webView.loadRequest(requestObj)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
